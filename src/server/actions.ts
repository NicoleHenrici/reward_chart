"use server";

import {
  addTask,
  buildAllTaskRecordEntities,
  buildTaskRecordEntitiesByWeekId,
  buildTaskRecordEntityByTaskId,
  createTaskCompletionItem,
  createWeek,
  deactivateTask,
  getCurrentWeek,
  updateTaskCompletionItem,
} from "@/lib/tasks";

import { TaskRecord } from "@/types/commonTypes";

export async function createTaskEntity(task: TaskRecord) {
  const taskId = addTask(task.taskTitle);
  const week = await getCurrentWeek();
  const weekId = week ? week.lastInsertRowid : createWeek();

  for (const day of task.week) {
    const dayCompleted = day.accomplished ? 1 : 0;

    createTaskCompletionItem(
      taskId as number,
      weekId as number,
      day.id,
      dayCompleted as number
    );
  }
}

export async function fetchTaskRecordsByWeekId(weekId?: number) {
  return buildTaskRecordEntitiesByWeekId(weekId);
}

export async function fetchAllTaskRecords() {
  return buildAllTaskRecordEntities();
}

export async function fetchTaskRecordByTaskId(taskId: number) {
  return buildTaskRecordEntityByTaskId(taskId);
}

export async function deactivateTaskById(taskId: number){
  deactivateTask(taskId);
}

export async function updateTaskCompletionItemById(itemId: number, completed: 1 | 0){
  updateTaskCompletionItem(itemId, completed);
}
