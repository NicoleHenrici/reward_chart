import { TaskRecord, WeekDay } from "@/types/commonTypes";

type TableCellProps = {
    task: TaskRecord;
    day: WeekDay;
    updateTask: (task: TaskRecord, toDelete: boolean, day?: WeekDay) => void;
};

export default function TableCell({ day, updateTask, task }: TableCellProps) {

    return (
        <td key={day.id}>
            <div className="form-check">
                <input className="form-check-input ms-auto float-none" type="checkbox" value="" id={`checkDefault-${day.id}`}
                    checked={day.accomplished} onChange={() => updateTask(task, false, day)} />
                <label className="form-check-label" htmlFor={`checkDefault-${day.id}`} hidden>
                    Erledigt
                </label>
            </div>
        </td>
    );
}