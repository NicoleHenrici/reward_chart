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
                const updatedSumAccomplished = updatedWeek.filter(day => day.accomplished).length;
                return { ...task, week: updatedWeek, sumAccomplished: updatedSumAccomplished };
            }

            return task;
        }));

        setScore((prevScore) => {
            const task = tasks.find((task) => task.id === id);
            if (task) {
                const day = task.week.find((day) => day.id === dayId);
                if (day) {
                    return day.accomplished ? prevScore - 1 : prevScore + 1;
                }
            }
            return prevScore;
        });
    }
    return (
        <>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <TableStructure tasks={tasks} deleteTaskHandler={deleteTaskHandler} toggleCheckedTaskHandler={toggleCheckedTaskHandler} />
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