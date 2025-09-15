import { TaskRecord } from "@/types/commonTypes";
import TableHead from "./tableHead";
import TableRow from "./tableRow";
import styles from "@/components/table/tableStructure.module.css";

type TableStructureProps = {
    tasks: TaskRecord[];
    setTasks: React.Dispatch<React.SetStateAction<TaskRecord[]>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function TableStructure({ tasks, setTasks, setScore }: TableStructureProps) {

    return (
        <table className={`table ${styles.table}`}>
            <TableHead />
            <tbody>
                {tasks && tasks.map((task) => (
                    <TableRow key={task.id} task={task} setTasks={setTasks} setScore={setScore} />
                ))}
            </tbody>
        </table>
    );
}