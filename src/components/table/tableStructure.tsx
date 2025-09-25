import { CompletedItem, TaskRecord } from "@/types/commonTypes";
import TableHead from "./tableHead";
import TableRow from "./tableRow";
import styles from "@/components/table/tableStructure.module.css";

type TableStructureProps = {
    tasks: TaskRecord[];
    datePerWeekDay: Date[];
    completedItem: CompletedItem | undefined;
    softDeleteTask: (taskId: number) => void;
    toggleCompletedItem: (taskId: number, date: Date, toDelete: boolean) => void;
};

export default function TableStructure({ tasks, completedItem, softDeleteTask, datePerWeekDay, toggleCompletedItem }: TableStructureProps) {
    return (
        <table className={`table ${styles.table}`}>
            <TableHead datePerWeekDay={datePerWeekDay}/>
            <tbody>
                {tasks.length != 0 && tasks.map((task, index) => (
                    <TableRow key={index} task={task} checkedDate={completedItem?.item[task.id!]} datePerWeekDay={datePerWeekDay} softDeleteTask={softDeleteTask} toggleCompletedItem={toggleCompletedItem}/>
                ))}
            </tbody>
        </table>
    );
}