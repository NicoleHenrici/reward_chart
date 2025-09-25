"use server";

import {
  createTask,
  createTaskCompletionItem,
  deactivateTask,
  deleteTaskCompletionItem,
  getAllActiveTasks,
  getIdOfLastTask,
  getTaskCompletionItemsByInterval,
} from "@/library/tasksLib";

import { CompletedItem, TaskRecord } from "@/types/commonTypes";

export async function addTask(task: TaskRecord) {
  createTask(task.title);
}

type Id = {
  taskId: number;
};

export async function fetchLatestTaskId() {
  const id = (await getIdOfLastTask()) as Id;

  return id.taskId;
}

export async function deactivateTaskById(taskId: number) {
  deactivateTask(taskId);
}

export async function fetchActiveTasks() {
  const rows = (await getAllActiveTasks()) as TaskRecord[];

  const activeRecords: TaskRecord[] = [];

  for (const row of rows) {
    const activeTask: TaskRecord = {
      id: row.id,
      title: row.title,
      active: row.active,
    };

    activeRecords.push(activeTask);
  }

  return activeRecords as TaskRecord[];
}

export async function addCompletedItem(taskId: number, date: Date) {
  createTaskCompletionItem(taskId, date);
}

export async function deleteCompletedItem(taskId: number, date: Date) {
  deleteTaskCompletionItem(taskId, date);
}

export async function fetchCompletedItemOfCurrentWeek() {
  const weekStart = new Date();
  const weekEnd = new Date();
  weekStart.setDate(weekStart.getDate() - (weekStart.getDay() - 1));
  weekEnd.setDate(weekEnd.getDate() - (weekEnd.getDay() - 7));

  const rows= (await getTaskCompletionItemsByInterval(
    weekStart,
    weekEnd
  )) as { completed_at: number; task_id: number }[];

  const completedItem: CompletedItem = mapRowsToCompletedItem(rows);

  return completedItem;
}

function mapRowsToCompletedItem(rows: { completed_at: number; task_id: number }[]) {
  const result: CompletedItem = { item: {} };

  for (const row of rows) {
    // SQLite julianday → JS Date
    const date = new Date((row.completed_at - 2440587.5) * 86400000);

    if (!result.item[row.task_id]) {
      result.item[row.task_id] = [];
    }
    result.item[row.task_id].push(date);
  }

  return result;
}
