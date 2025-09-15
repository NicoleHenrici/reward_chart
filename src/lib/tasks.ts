import Database from "better-sqlite3";

const db = new Database("rewards_chart.db");

function initDb() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_description TEXT NOT NULL,
            active BOOLEAN NOT NULL DEFAULT 1
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
            completed BOOLEAN NOT NULL,
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
  stmt.run(taskDescription);
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

  stmt.run();
}

export function getCurrentWeek() {
  const stmt = db.prepare(`
    SELECT *
    FROM week
    WHERE week_start_date <= julianday('now') AND week_end_date >= julianday('now')
  `);

  return stmt.get();
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
  dayOfWeek: number,
  completed: boolean
) {
  const stmt = db.prepare(
    `
      INSERT INTO task_completion (task_id, week_id, day_of_week, completed)
      VALUES (?, ?, ?, ?);
    `
  );

  stmt.run(taskId, weekId, dayOfWeek, completed);
}

export function updateTaskCompletionItem(
  taskCompletionId: number,
  completed: boolean
) {
  const stmt = db.prepare(`
    UPDATE task_completion
    SET completet = ?
    WHERE id = ?
    `);

  const result = stmt.run(completed, taskCompletionId);

  itemNotFound(result, taskCompletionId);
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

function itemNotFound(result: Database.RunResult, id: number) {
  if (result.changes === 0) {
    console.warn(`Item mit ID ${id} nicht gefunden.`);
  }
}
