import { WeekDay } from "@/types/commonTypes";

type TableCellProps = {
    taskId: number;
    day: WeekDay;
    updateTask: (taskId: number, toDelete: boolean, day?: WeekDay) => void;
};

export default function TableCell({ taskId, day, updateTask }: TableCellProps) {

    return (
        <td key={day.id}>
            <div className="form-check">
                <input className="form-check-input ms-auto float-none" type="checkbox" value="" id={`checkDefault-${day.id}`}
                 onChange={() => updateTask(taskId, false, day)} />
                <label className="form-check-label" htmlFor={`checkDefault-${day.id}`} hidden>
                    Erledigt
                </label>
            </div>
        </td>
    );
}