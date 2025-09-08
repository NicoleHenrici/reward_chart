import { TaskRecord } from "@/types/commonTypes";
import { GoSmiley } from "react-icons/go";
import { MdDelete } from "react-icons/md";

export default function TableRow({task}: {task: TaskRecord}) {
    return (
        <tr key={task.id}>
            <th scope="row">{task.task}</th>
            {task.week.map((day, index) => (
                <td key={index}>{day.accomplished ? <GoSmiley /> : "x"}</td>
            ))}
            <td><button type="button" className="btn btn-link"><MdDelete /></button></td>
        </tr>
    );
}