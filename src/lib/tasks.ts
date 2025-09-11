import Database from "better-sqlite3";

const db = new Database("rewards_chart.db");

function initDb() {
  db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_description TEXT NOT NULL
    )`);
  db.exec(`
        CREATE TABLE IF NOT EXISTS week (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            week_start_date REAL NOT NULL
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

  return stmt.get(taskId);
}

export function getAllTasks() {
  const stmt = db.prepare(`
        SELECT *
        FROM tasks
    `);

  return stmt.all();
}
