"use client";

import { useEffect, useState } from "react";
import CardStructure from "../card/cardStructure"
import TableStructure from "../table/tableStructure"
import { CompletedItem, TaskRecord } from "@/types/commonTypes";
import Modal from "../modal/modal";
import NewTask from "./newTask";

type TaskOverviewProps = {
    createNewTask: (task: TaskRecord) => void;
    getTaskRecords: () => Promise<TaskRecord[]>;
    getLatestTaskId: () => Promise<number>;
    softDeleteTaskById: (taskId: number) => void;
    createCompletedItem: (taskId: number, date: Date) => void;
    deleteCompletedItem: (taskId: number, date: Date) => void;
    getCompletedItem:() => Promise<CompletedItem>;
};

export default function TaskOverview({ createNewTask, getTaskRecords, softDeleteTaskById, getLatestTaskId, createCompletedItem, deleteCompletedItem, getCompletedItem }: TaskOverviewProps) {

    const [isVisible, setIsVisible] = useState(false);
    const [tasks, setTasks] = useState<TaskRecord[]>([]);
    const [score, setScore] = useState(0);
    const [datePerWeekDay, setDatePerWeekDay] = useState<Date[]>([]);
    const [completedItem, setCompletedItem] = useState<CompletedItem>()

    useEffect(() => {
        async function fetchTasks() {
            // const currentDate = new Date();

            const taskRecords: TaskRecord[] = await getTaskRecords();

            for (const taskRecord of taskRecords) {
                const newRecord: TaskRecord = taskRecord;

                setTasks((prevTasks) => [...prevTasks, newRecord]);
            }

        }

        async function fetchCompletedItems(){
            const completedItem: CompletedItem = await getCompletedItem();

            setCompletedItem(completedItem);
        }

        const dayCount = 7;
        const weekDays: Date[] = [];
        
        for (let i = 1; i <= dayCount; i++) {
            const newDate = new Date();
            newDate.setDate(newDate.getDate() - (newDate.getDay() - i));
            weekDays.push(newDate);
        }
        
        fetchTasks();
        fetchCompletedItems();
        setDatePerWeekDay(weekDays);
        

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function toggleTaskActiveState(taskId: number) {
        softDeleteTaskById(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    }

    function showModalHandler() {
        setIsVisible((prevVisible) => !prevVisible);
    }

    async function createTask(newTask: TaskRecord) {
        createNewTask(newTask);

        const taskId = await getLatestTaskId();

        newTask.id = taskId;

        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    function toggleCompletionOfItem(taskId: number, date: Date, toDelete: boolean){
        if(toDelete){
             deleteCompletedItem(taskId, date)
        } else {
            createCompletedItem(taskId, date);
        }
    }

    return (
        <>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <TableStructure tasks={tasks} completedItem={completedItem} softDeleteTask={toggleTaskActiveState} datePerWeekDay={datePerWeekDay} toggleCompletedItem={toggleCompletionOfItem}/>
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