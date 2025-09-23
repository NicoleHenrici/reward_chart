"use client";

import { useEffect, useState } from "react";
import CardStructure from "../card/cardStructure"
import TableStructure from "../table/tableStructure"
import { TaskRecord, WeekDay } from "@/types/commonTypes";
import Modal from "../modal/modal";
import NewTask from "./newTask";

type TaskOverviewProps = {
    createNewTask: (task: TaskRecord) => Promise<number>;
    getTaskRecordsByCurrentWeek: (weekId?: number | undefined) => Promise<TaskRecord[]>;
    updateTaskItem: (taskId: number, state: 1|0, dayIndex: number) => void;
    softDeleteTaskById: (taskId: number) => void;
};

export default function TaskOverview({ createNewTask, getTaskRecordsByCurrentWeek, updateTaskItem, softDeleteTaskById }: TaskOverviewProps) {

    const [isVisible, setIsVisible] = useState(false);
    const [tasks, setTasks] = useState<TaskRecord[]>([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        async function fetchTasks() {
            const taskRecords = await getTaskRecordsByCurrentWeek();
            setTasks(taskRecords);
        }
        fetchTasks();
    });

    function showModalHandler() {
        setIsVisible((prevVisible) => !prevVisible);
    }

    function updateTask(taskId: number, toDelete: boolean, day?: WeekDay) {
        if (toDelete && taskId) {
            softDeleteTaskById(taskId);
        } else if(day) {
            const completedState = !day.accomplished ? 1 : 0;

            console.log('update day')
            console.log(day.dayIndex)
            updateTaskItem(taskId, completedState, day.dayIndex);
        }

        console.log('update')
    }

    async function createTask(newTask: TaskRecord) {
        const taskId = await createNewTask(newTask);

        newTask.id = taskId as number;

        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    return (
        <>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <TableStructure tasks={tasks} updateTask={updateTask} />
                        <button type="button" className="btn btn-outline-primary"
                            onClick={showModalHandler}>Neue Zeile</button>
                    </div>
                    <div className="col-2">
                        <CardStructure score={score} tasksLength={tasks.length} title="Übersicht" />
                    </div>
                </div>
            </div>

            {isVisible && <Modal customFn={showModalHandler}>
                <NewTask createNewTask={createTask} showModalHandler={showModalHandler} />
            </Modal>}
        </>
    );
}