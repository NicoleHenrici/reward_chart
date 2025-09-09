"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Modal from "@/components/modal/modal";
import NewTask from "@/components/tasks/newTask";
import { TaskRecord } from "@/types/commonTypes";
import TableStructure from "@/components/table/tableStructure";


export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [tasks, setTasks] = useState<TaskRecord[]>([]);

  function showModalHandler() {
    setIsVisible((prevVisible) => !prevVisible);
  }

  function addTaskHandler(task: TaskRecord) {
    setTasks((prevTasks) => [...prevTasks, task]);
    showModalHandler();
  }

  function deleteTaskHandler(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function toggleCheckedTaskHandler(id: number, dayId: number) {
    setTasks((prevTasks) => prevTasks.map((task) => {
      if (task.id === id) {
        const updatedWeek = task.week.map((day) => {
          if (day.id === dayId) {
            return { ...day, accomplished: !day.accomplished };
          }
          return day;
        });
        return { ...task, week: updatedWeek };
      }
      return task;
    }));
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <table className={`table ${styles.table}`}>
          <TableHead />
          <tbody>
            {tasks && tasks.map((task) => (
            <TableRow key={task.id} task={task} removeTask={deleteTaskHandler} toggleAccomplished={toggleCheckedTaskHandler} />
            ))}
          </tbody>
        </table> */}
        <TableStructure tasks={tasks} deleteTaskHandler={deleteTaskHandler} toggleCheckedTaskHandler={toggleCheckedTaskHandler} />
        <button type="button" className="btn btn-outline-primary"
          onClick={showModalHandler}>Neue Zeile</button>
        {isVisible && <Modal customFn={showModalHandler}>
          <NewTask newTaskHandler={addTaskHandler} />
        </Modal>}
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

