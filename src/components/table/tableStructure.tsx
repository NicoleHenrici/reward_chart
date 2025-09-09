import { TaskRecord } from "@/types/commonTypes";
import TableHead from "./tableHead";
import TableRow from "./tableRow";
import styles from "@/components/table/tableStructure.module.css";

type TableStructureProps = {
    tasks: TaskRecord[];
    deleteTaskHandler: (id: number) => void;
    toggleCheckedTaskHandler: (id: number, dayId: number) => void;
};

export default function TableStructure({ tasks, deleteTaskHandler, toggleCheckedTaskHandler }: TableStructureProps) {

    return (
        <table className={`table ${styles.table}`}>
            <TableHead />
            <tbody>
                {tasks && tasks.map((task) => (
                    <TableRow key={task.id} task={task} removeTask={deleteTaskHandler} toggleAccomplished={toggleCheckedTaskHandler} />
                ))}
            </tbody>
        </table>
    );
}