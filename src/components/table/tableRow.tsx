import { TaskRecord } from "@/types/commonTypes";
import { MdDelete } from "react-icons/md";
import TableCell from "./tableCell";

type TableRowProps = {
    task: TaskRecord;
    setTasks: React.Dispatch<React.SetStateAction<TaskRecord[]>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function TableRow({ task, setTasks, setScore }: TableRowProps) {

    function deleteTaskHandler(id: number) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        
        setScore((prevScore) => prevScore - task.week.filter(day => day.accomplished).length);
    }

    return (
        <tr key={task.id}>
            <th scope="row">{task.taskTitle}</th>
            {task.week.map((day) => (
                <TableCell key={day.id} day={day} taskId={task.id} setTasks={setTasks} setScore={setScore} />
            ))}
            <td><button type="button" className="btn btn-link" onClick={() => deleteTaskHandler(task.id)}><MdDelete /></button></td>
        </tr>
    );
}