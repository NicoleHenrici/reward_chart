"use server";

import {
  addTask,
  createTaskCompletionItem,
  createWeek,
  getCurrentWeek
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
