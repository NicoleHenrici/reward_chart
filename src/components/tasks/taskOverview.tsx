"use client";

import { useState } from "react";
import CardStructure from "../card/cardStructure"
import TableStructure from "../table/tableStructure"
import { TaskRecord } from "@/types/commonTypes";
import Modal from "../modal/modal";
import NewTask from "./newTask";

export default function TaskOverview() {

    const [isVisible, setIsVisible] = useState(false);
    const [tasks, setTasks] = useState<TaskRecord[]>([]);
    const [score, setScore] = useState(0);

    function showModalHandler() {
        setIsVisible((prevVisible) => !prevVisible);
    }

    function addTaskHandler(task: TaskRecord) {
        setTasks((prevTasks) => [...prevTasks, task]);
        showModalHandler();
    }

    
    return (
        <>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <TableStructure tasks={tasks} setTasks={setTasks} setScore={setScore} />
                        <button type="button" className="btn btn-outline-primary"
                            onClick={showModalHandler}>Neue Zeile</button>
                    </div>
                    <div className="col-2">
                        <CardStructure score={score} tasksLength={tasks.length} title="Übersicht" />
                    </div>
                </div>
            </div>

            {isVisible && <Modal customFn={showModalHandler}>
                <NewTask newTaskHandler={addTaskHandler} />
            </Modal>}
        </>
    );
}