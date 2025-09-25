import Database from "better-sqlite3";

const db = new Database("rewards_chart.db");

function initDb() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL, 
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
        INSERT INTO task (title)
        VALUES (?);
    `);

  stmt.run(taskDescription);
}

export function getIdOfLastTask() {
  const stmt = db.prepare(`
      SELECT MAX(id)
      AS taskId
      FROM task;
    `);

  const row = stmt.get();

  return row;
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

export function getAllActiveTasks() {
  const stmt = db.prepare(`
        SELECT *
        FROM task
        WHERE active = 1;
    `);

  return stmt.all();
}

export function updateTask(taskId: number, updatetTaskDescription: string) {
  const stmt = db.prepare(`
        UPDATE task
        SET title = ?
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

export function createTaskCompletionItem(taskId: number, date: Date) {
  const isoDate = date.toISOString().slice(0, 10);

  const stmt = db.prepare(
    `
      INSERT INTO task_completion (completed_at, task_id)
      VALUES (julianday(?), ?);
    `
  );

  stmt.run(isoDate, taskId);
}

export function deleteTaskCompletionItem(taskId: number, date: Date) {
  const isoDate = date.toISOString().slice(0, 10);

  console.log("taskId:", taskId, "isoDate:", isoDate);

  const stmt = db.prepare(`
    DELETE FROM task_completion
    WHERE task_id = ? AND date(completed_at) = ?;
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
  startDate: Date,
  endDate?: Date
) {
  if (!endDate) {
    endDate = startDate;
  }
  const startIso = startDate.toISOString().slice(0, 10);
  const endIso = endDate.toISOString().slice(0, 10);

  const stmt = db.prepare(`
    SELECT *
    FROM task_completion
    WHERE completed_at BETWEEN julianday(?) AND julianday(?); 
    `);

  return stmt.all(startIso, endIso);
}

function itemNotFound(result: Database.RunResult, id: number) {
  if (result.changes === 0) {
    console.warn(`Item mit ID ${id} nicht gefunden.`);
  }
}
