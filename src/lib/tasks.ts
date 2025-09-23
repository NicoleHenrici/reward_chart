import { TaskRecord } from "@/types/commonTypes";
import Database from "better-sqlite3";

const db = new Database("rewards_chart.db");

function initDb() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_description TEXT NOT NULL,
            active INTEGER NOT NULL DEFAULT 1
    )`);
  db.exec(`
        CREATE TABLE IF NOT EXISTS week (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            week_start_date REAL NOT NULL,
            week_end_date REAL NOT NULL
    )`);
  db.exec(`
        CREATE TABLE IF NOT EXISTS task_completion (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            week_id INTEGER NOT NULL,
            day_index INTEGER NOT NULL DEFAULT 0,
            completed INTEGER NOT NULL,
            FOREIGN KEY (task_id) REFERENCES tasks(id),
            FOREIGN KEY (week_id) REFERENCES week(id)
    )`);
}

initDb();

export function addTask(taskDescription: string) {
  const stmt = db.prepare(`
        INSERT INTO tasks (task_description)
        VALUES (?);
    `);
  return stmt.run(taskDescription).lastInsertRowid;
}

export function getTaskById(taskId: number) {
  const stmt = db.prepare(`
        SELECT *
        FROM tasks
        WHERE id = ?
    `);

  const result = stmt.run(taskId);

  itemNotFound(result, taskId);

  return result;
}

export function getAllTasks() {
  const stmt = db.prepare(`
        SELECT *
        FROM tasks
    `);

  return stmt.all();
}

export function updateTask(taskId: number, updatetTaskDescription: string) {
  const stmt = db.prepare(`
        UPDATE tasks
        SET task_description = ?
        WHERE id = ?;
    `);
  const result = stmt.run(updatetTaskDescription, taskId);

  itemNotFound(result, taskId);
}

/**
 * Soft delete a task to keep historical data intact.
 * @param taskId
 */
export function deactivateTask(taskId: number) {
  const stmt = db.prepare(`
      UPDATE tasks
      SET active = 0
      WHERE id = ?;
    `);

  const result = stmt.run(taskId);

  itemNotFound(result, taskId);
}

export function createWeek() {
  const stmt = db.prepare(`
      INSERT INTO week (week_start_date, week_end_date)
      VALUES(julianday('now', 'weekday 1', '-7 days'), julianday('now', 'weekday 0'));
    `);

  return stmt.run().lastInsertRowid;
}

export function getCurrentWeek() {
  const stmt = db.prepare(`
    SELECT *
    FROM week
    WHERE week_start_date <= julianday('now') AND week_end_date >= julianday('now')
  `);

  return stmt.run();
}

export function getAllWeeks() {
  const stmt = db.prepare(`
    SELECT *
    FROM week
    `);

  return stmt.all();
}

export function createTaskCompletionItem(
  taskId: number,
  weekId: number,
  dayIndex: number,
  completed: number
) {
  const stmt = db.prepare(
    `
      INSERT INTO task_completion (task_id, week_id, day_index, completed)
      VALUES (?, ?, ?, ?);
    `
  );

  stmt.run(taskId, weekId, dayIndex, completed);
}

export function updateTaskCompletionItem(
  taskId: number,
  completed: 1 | 0,
  dayIndex: number
) {
  const stmt = db.prepare(`
    UPDATE task_completion
    SET completed = ?
    WHERE task_id = ? AND day_index = ?;
    `);

  const result = stmt.run(completed, taskId, dayIndex);

  itemNotFound(result, taskId);
}

export function getTaskCompletionItemsByTaskId(taskId: number) {
  const stmt = db.prepare(`
    SELECT *
    FROM task_completion
    WHERE task_id = ?
    `);

  const result = stmt.run(taskId);

  itemNotFound(result, taskId);

  return result;
}

export function getTaskCompletionItemsByWeekId(weekId: number) {
  const stmt = db.prepare(`
    SELECT *
    FROM task_completion
    WHERE week_id = ?
    `);

  const result = stmt.run(weekId);

  itemNotFound(result, weekId);

  return result;
}

export function getAllTaskCompletionItems() {
  const stmt = db.prepare(`
    SELECT *
    FROM task_completion
    `);

  return stmt.all();
}

export function buildAllTaskRecordEntities() {
  const stmt = db.prepare(`
      SELECT 
        tc.id as completionId,
        tc.task_id as taskId,
        tc.day_index as dayIndex,
        tc.completed as completed,
        t.task_description as taskTitle,
        w.id as weekId
      FROM task_completion tc
      JOIN tasks t ON t.id = tc.task_id
      JOIN week w ON w.id = tc.week_id
      ORDER BY tc.task_id, tc.day_index
    `);

  const taskRecordEntities: TaskRecord[] = mapToTsType(stmt.all() as TaskRow[]);

  return taskRecordEntities;
}

export function buildTaskRecordEntitiesByWeekId(weekId?: number) {
  let currentWeekId;

  if (weekId) {
    currentWeekId = weekId;
  } else {
    const currentWeek = getCurrentWeek();
    currentWeekId =
      currentWeek && currentWeek.lastInsertRowid
        ? (currentWeek.lastInsertRowid as number)
        : createWeek();
  }

  const stmt = db.prepare(`
      SELECT 
        tc.id as completionId,
        tc.task_id as taskId,
        tc.day_index as dayIndex,
        tc.completed as completed,
        t.task_description as taskTitle,
        w.id as weekId
      FROM task_completion tc
      JOIN tasks t ON t.id = tc.task_id
      JOIN week w ON w.id = tc.week_id
      WHERE w.id = ?
      ORDER BY tc.task_id, tc.day_index
    `);

  const taskRecordEntities: TaskRecord[] = mapToTsType(
    stmt.all(currentWeekId) as TaskRow[]
  );

  return taskRecordEntities;
}

export function buildTaskRecordEntityByTaskId(taskId: number) {
  const currentWeek = getCurrentWeek();
  const currentWeekId =
    currentWeek && currentWeek.lastInsertRowid
      ? (currentWeek.lastInsertRowid as number)
      : createWeek();

  const stmt = db.prepare(`
      SELECT 
        tc.id as completionId,
        tc.task_id as taskId,
        tc.day_index as dayIndex,
        tc.completed as completed,
        t.task_description as taskTitle,
        t.active as taskActiveState,
        w.id as weekId
      FROM task_completion tc
      JOIN tasks t ON t.id = tc.task_id
      JOIN week w ON w.id = tc.week_id
      WHERE w.id = ? AND t.id = ?
      ORDER BY tc.task_id, tc.day_index
    `);

  const taskRecordEntities: TaskRecord[] = mapToTsType(
    stmt.all(currentWeekId, taskId) as TaskRow[]
  );

  return taskRecordEntities;
}

function itemNotFound(result: Database.RunResult, id: number) {
  if (result.changes === 0) {
    console.warn(`Item mit ID ${id} nicht gefunden.`);
  }
}

type TaskRow = {
  taskId: number;
  completionId: number;
  dayIndex: number;
  completed: number;
  taskTitle: string;
  weekId: number;
  taskActiveState: 1|0;
};

function mapToTsType(rows: TaskRow[]): TaskRecord[] {
  const taskMap = new Map<number, TaskRecord>();
  const dayName = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  if (rows.length !== 0) {
    for (const row of rows) {
      if (!taskMap.has(row.taskId)) {
        taskMap.set(row.taskId, {
          id: row.taskId,
          taskTitle: row.taskTitle,
          week: [],
          activeState: row.taskActiveState
        });
      }

      const task = taskMap.get(row.taskId);

      if (task) {
        task.week.push({
          id: row.completionId,
          dayIndex: row.dayIndex,
          day: dayName[row.dayIndex],
          accomplished: row.completed === 1 ? true : false,
        });
      }
    }
  }
  return Array.from(taskMap.values());
}
