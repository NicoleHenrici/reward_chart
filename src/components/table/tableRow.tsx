import { TaskRecord, WeekDay } from "@/types/commonTypes";
import { MdDelete } from "react-icons/md";
import TableCell from "./tableCell";

type TableRowProps = {
    task: TaskRecord;
    updateTask: (task: TaskRecord, toDelete: boolean, day?: WeekDay) => void;
};

export default function TableRow({ task, updateTask }: TableRowProps) {

    return (
        <tr key={task.id}>
            <th scope="row">{task.taskTitle}</th>
            {task.week.map((day) => (
                <TableCell key={day.id} day={day} task={task} updateTask={updateTask} />
            ))}
            <td><button type="button" className="btn btn-link" onClick={() => updateTask(task, true)}><MdDelete /></button></td>
        </tr>
    );
}