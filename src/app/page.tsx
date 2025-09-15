
import Image from "next/image";
import styles from "./page.module.css";
import TaskOverview from "@/components/tasks/taskOverview";
import { addTask, createTaskCompletionItem, createWeek } from "@/lib/tasks";
import { TaskRecord } from "@/types/commonTypes";


export default function Home() {

  async function createNewTask(task: TaskRecord) {
    "use server"
    const taskId = addTask(task.taskTitle)
    const weekId = createWeek();

    for (const day of task.week) {
      const dayCompleted = day.accomplished ? 1 : 0;

      createTaskCompletionItem(taskId as number, weekId as number, day.id, dayCompleted as number);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TaskOverview createNewTask={createNewTask} />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

