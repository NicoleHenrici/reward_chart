import { TaskRecord } from "@/types/commonTypes";
import { MdDelete } from "react-icons/md";
import TableCell from "./tableCell";

type TableRowProps = {
    task: TaskRecord;
    removeTask: (id: number) => void;
    toggleAccomplished?: (id: number, dayId: number) => void;
};

export default function TableRow({ task, removeTask, toggleAccomplished }: TableRowProps) {

    return (
        <tr key={task.id}>
            <th scope="row">{task.task}</th>
            {task.week.map((day) => (
                <TableCell key={day.id} day={day} taskId={task.id} toggleAccomplished={toggleAccomplished} />
            ))}
            <td><button type="button" className="btn btn-link" onClick={() => removeTask(task.id)}><MdDelete /></button></td>
        </tr>
    );
}