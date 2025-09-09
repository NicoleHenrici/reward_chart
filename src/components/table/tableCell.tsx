import { WeekDay } from "@/types/commonTypes";

type TableCellProps = {
    day: WeekDay;
    toggleAccomplished?: (id: number, dayId: number) => void;
    taskId: number;
};

export default function TableCell({ day, toggleAccomplished, taskId }: TableCellProps) {
    return (
        <td key={day.id}>
            <div className="form-check">
                <input className="form-check-input ms-auto float-none" type="checkbox" value="" id={`checkDefault-${day.id}`}
                    checked={day.accomplished} onChange={() => toggleAccomplished?.(taskId, day.id)} />
                <label className="form-check-label" htmlFor={`checkDefault-${day.id}`} hidden>
                    Erledigt
                </label>
            </div>
        </td>
    );
}