import Database from "better-sqlite3";

const db = new Database("rewards_chart.db");

function initDb() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL, 
            active INTEGER NOT NULL DEFAULT 1
    )`);
  db.exec(`
        CREATE TABLE IF NOT EXISTS task_completion (
            completed_at REAL NOT NULL,
            task_id INTEGER NOT NULL,
            FOREIGN KEY (task_id) REFERENCES task(id),
            PRIMARY KEY (task_id, completed_at)

    )`);
}

initDb();

export function createTask(taskDescription: string) {
  const stmt = db.prepare(`
        INSERT INTO task (description)
        VALUES (?);
    `);
  return stmt.run(taskDescription).lastInsertRowid;
}

export function getTaskById(taskId: number) {
  const stmt = db.prepare(`
        SELECT *
        FROM task
        WHERE id = ?
    `);

  const result = stmt.run(taskId);

  itemNotFound(result, taskId);

  return result;
}

export function getAllTasks() {
  const stmt = db.prepare(`
        SELECT *
        FROM task;
    `);

  return stmt.all();
}

export function getAllActiveTasks(activeState: boolean) {
  const stmt = db.prepare(`
        SELECT *
        FROM task
        WHERE active = 1;
    `);

  return stmt.run(activeState);
}

export function updateTask(taskId: number, updatetTaskDescription: string) {
  const stmt = db.prepare(`
        UPDATE task
        SET description = ?
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
      UPDATE task
      SET active = 0
      WHERE id = ?;
    `);

  const result = stmt.run(taskId);

  itemNotFound(result, taskId);
}

export function createTaskCompletionItem(taskId: number) {
  const stmt = db.prepare(
    `
      INSERT INTO task_completion (completed_at, task_id)
      VALUES (julianday('now'), ?);
    `
  );

  stmt.run(taskId);
}

export function deleteTaskCompletionItem(taskId: number, date: string) {
  const [day, month, year] = date.split(".");
  const isoDate = `${year}-${month}-${day}`; // "YYYY-MM-DD"

  const stmt = db.prepare(`
    DELETE task_completion
    WHERE task_id = ? AND strftime('%d.%m.%Y', completed_at, 'unixepoch') = ?;
    `);

  const result = stmt.run(taskId, isoDate);

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

export function getTaskCompletionItemsByInterval(
  startDate: string,
  endDate?: string
) {
  if (!endDate) {
    endDate = startDate;
  }

  const [day1, month1, year1] = startDate.split(".");
  const startIso = `${year1}-${month1}-${day1}`;

  const [day2, month2, year2] = endDate.split(".");
  const endIso = `${year2}-${month2}-${day2}`;

  const stmt = db.prepare(`
    SELECT *
    FROM task_completion
    WHERE completed_at BETWEEN julianday(?) AND julianday(?); 
    `);

  return stmt.run(startIso, endIso);
}

function itemNotFound(result: Database.RunResult, id: number) {
  if (result.changes === 0) {
    console.warn(`Item mit ID ${id} nicht gefunden.`);
  }
}