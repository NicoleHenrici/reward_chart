"use client";

import { useEffect, useState } from "react";
import CardStructure from "../card/cardStructure"
import TableStructure from "../table/tableStructure"
import { TaskRecord, WeekDay } from "@/types/commonTypes";
import Modal from "../modal/modal";
import NewTask from "./newTask";

type TaskOverviewProps = {
    createNewTask: (task: TaskRecord) => void;
    getTaskRecordsByCurrentWeek: (weekId?: number | undefined) => Promise<TaskRecord[]>;
    updateTaskItem: (itemId: number, state: 1|0) => void;
};

export default function TaskOverview({ createNewTask, getTaskRecordsByCurrentWeek, updateTaskItem }: TaskOverviewProps) {

    const [isVisible, setIsVisible] = useState(false);
    const [tasks, setTasks] = useState<TaskRecord[]>([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        async function fetchTasks() {
            const taskRecords = await getTaskRecordsByCurrentWeek();
            setTasks(taskRecords);
        }
        fetchTasks();
    }, []);

    function showModalHandler() {
        setIsVisible((prevVisible) => !prevVisible);
    }

    function updateTask(task: TaskRecord, toDelete: boolean, day?: WeekDay) {
        // if (toDelete) {
        //     setTasks((prevTasks) => prevTasks.filter((el) => el.id !== task.id));

        //     setScore((prevScore) => prevScore - task.week.filter(day => day.accomplished).length);
        // } else {
        //     setTasks((prevTasks) => prevTasks.map((el) => {
        //         if (el.id === task.id && day) {
        //             const updatedWeek = el.week.map((elDay) => {
        //                 if (elDay.id === day.id) {
        //                     return { ...elDay, accomplished: !elDay.accomplished };
        //                 }
        //                 return elDay;
        //             });
        //             const updatedSumAccomplished = updatedWeek.filter(weekDay => weekDay.accomplished).length;
        //             return { ...el, week: updatedWeek, sumAccomplished: updatedSumAccomplished };
        //         }
        //         return el;
        //     }));

        //     setScore((prevScore) => {
        //     if (day) {
        //         return day.accomplished ? prevScore - 1 : prevScore + 1;
        //     }
        //     return prevScore;
        // });
        // }
    }

    function createTask(newTask: TaskRecord) {
        createNewTask(newTask);
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