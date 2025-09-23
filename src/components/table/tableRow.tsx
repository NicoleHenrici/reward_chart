import { TaskRecord, WeekDay } from "@/types/commonTypes";
import { MdDelete } from "react-icons/md";
import TableCell from "./tableCell";

type TableRowProps = {
    task: TaskRecord;
    updateTask: (taskId: number, toDelete: boolean, day?: WeekDay) => void;
};

export default function TableRow({ task, updateTask }: TableRowProps) {

    function deleteHandler(task: TaskRecord, toDelete: boolean){
        if(task.id)
            updateTask(task.id, toDelete);
    }

    return (
        <tr key={task.id}>
            <th scope="row">{task.taskTitle}</th>
            {task.week.map((day) => (
                <TableCell key={day.id} day={day} taskId={task.id!} updateTask={updateTask} />
            ))}
            <td><button type="button" className="btn btn-link" onClick={() => deleteHandler(task,true)}><MdDelete /></button></td>
        </tr>
    );
}