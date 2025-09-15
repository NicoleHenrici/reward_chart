import { TaskRecord, WeekDay } from "@/types/commonTypes";
import TableHead from "./tableHead";
import TableRow from "./tableRow";
import styles from "@/components/table/tableStructure.module.css";

type TableStructureProps = {
    tasks: TaskRecord[];
    updateTask: (task: TaskRecord, toDelete: boolean, day?: WeekDay) => void;
};

export default function TableStructure({ tasks, updateTask }: TableStructureProps) {

    return (
        <table className={`table ${styles.table}`}>
            <TableHead />
            <tbody>
                {tasks && tasks.map((task) => (
                    <TableRow key={task.id} task={task} updateTask={updateTask} />
                ))}
            </tbody>
        </table>
    );
}