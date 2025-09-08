"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Modal from "@/components/modal";
import NewTask from "@/components/newTask";
import { TaskRecord } from "@/types/commonTypes";


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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <table className={`table ${styles.table}`}>
          <thead>
            <tr>
              <th scope="col">AUFGABE</th>
              <th scope="col">MONTAG</th>
              <th scope="col">DIENSTAG</th>
              <th scope="col">MITTWOCH</th>
              <th scope="col">DONNERSTAG</th>
              <th scope="col">FREITAG</th>
              <th scope="col">SASMSTAG</th>
              <th scope="col">SONNTAG</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.map((task) => (
            <tr key={task.id}>
              <th scope="row">{task.task}</th>
              {task.week.map((day,index) => (
                <td key={index}>{day ? "o" : "x"}</td>
              ))}
            </tr>
            ))}
          </tbody>
        </table>
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

