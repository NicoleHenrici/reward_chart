"use server";

import {
  addTask,
  createTaskCompletionItem,
  createWeek,
  getCurrentWeek,
} from "@/lib/tasks";
import { TaskRecord } from "@/types/commonTypes";
import { cookies } from "next/headers";

export async function checkCurrentWeek() {
  const cookieStore = await cookies();
  let currentWeekId: number | undefined = undefined;

  currentWeekId = cookieStore.get("currentWeekId") as number | undefined;

  if (currentWeekId === undefined) {
    currentWeekId = getCurrentWeek() as number | undefined;

    if (currentWeekId === undefined) {
      currentWeekId = createWeek() as number;
    }

    weekToCache(currentWeekId as number);
  }

  return currentWeekId;
}

async function weekToCache(currentWeekId: number) {
  const cookieStore = await cookies();

  cookieStore.set("currentWeekId", currentWeekId.toString());
}

export async function createNewTask(task: TaskRecord) {
  const taskId = addTask(task.taskTitle);
  const weekId = createWeek();

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
