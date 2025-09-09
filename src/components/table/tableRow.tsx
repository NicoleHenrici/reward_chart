import { TaskRecord } from "@/types/commonTypes";
import { MdDelete } from "react-icons/md";

type TableRowProps = {
    task: TaskRecord;
    removeTask: (id: number) => void;
    toggleAccomplished?: (id: number, dayId: number) => void;
};

export default function TableRow({ task, removeTask, toggleAccomplished }: TableRowProps) {

    return (
        <tr key={task.id}>
            <th scope="row">{task.task}</th>
            {task.week.map((day, index) => (
                <td key={index}><div className="form-check">
                    <input className="form-check-input ms-auto float-none" type="checkbox" value="" id={`checkDefault-${index}`} 
                    checked={day.accomplished} onChange={() => toggleAccomplished?.(task.id, day.id)} />
                    <label className="form-check-label" htmlFor={`checkDefault-${index}`} hidden>
                        Erledigt
                    </label>
                </div></td>
            ))}
            <td><button type="button" className="btn btn-link" onClick={() => removeTask(task.id)}><MdDelete /></button></td>
        </tr>
    );
}