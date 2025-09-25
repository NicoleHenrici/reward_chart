import { TaskRecord } from "@/types/commonTypes";
import { MdDelete } from "react-icons/md";
import TableCell from "./tableCell";

type TableRowProps = {
    task: TaskRecord;
    datePerWeekDay: Date[];
    checkedDate: Date[] | undefined;
    softDeleteTask: (taskId: number) => void;
    toggleCompletedItem: (taskId: number, date: Date, toDelete: boolean) => void;
};

export default function TableRow({ task, checkedDate, softDeleteTask, toggleCompletedItem, datePerWeekDay }: TableRowProps) {

    function deleteHandler(taskId:number){
        softDeleteTask(taskId);
    }

    const week = ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];

    return (
        <tr key={task.id}>
            <th scope="row">{task.title}</th>
            {week.map((_day, index) => (
                <TableCell key={index} index={index} checkedDate={checkedDate} datePerWeekDay={datePerWeekDay} taskId={task.id!} toggleCompletedItem={toggleCompletedItem}/>
            ))}
            <td><button type="button" className="btn btn-link" onClick={() => deleteHandler(task.id!)}><MdDelete /></button></td>
        </tr>
    );
}