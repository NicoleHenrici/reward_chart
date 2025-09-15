import { TaskRecord, WeekDay } from "@/types/commonTypes";

type TableCellProps = {
    day: WeekDay;
    setTasks: React.Dispatch<React.SetStateAction<TaskRecord[]>>;
        setScore: React.Dispatch<React.SetStateAction<number>>;
    taskId: number;
};

export default function TableCell({ day, setTasks, setScore, taskId }: TableCellProps) {

    function toggleCheckedTaskHandler(id: number, dayId: number) {
        setTasks((prevTasks) => prevTasks.map((task) => {
            if (task.id === id) {
                const updatedWeek = task.week.map((day) => {
                    if (day.id === dayId) {
                        return { ...day, accomplished: !day.accomplished };
                    }
                    return day;
                });
                const updatedSumAccomplished = updatedWeek.filter(day => day.accomplished).length;
                return { ...task, week: updatedWeek, sumAccomplished: updatedSumAccomplished };
            }

            return task;
        }));

        setScore((prevScore) => {
            if (day) {
                return day.accomplished ? prevScore - 1 : prevScore + 1;
            }
            return prevScore;
        });
    }

    return (
        <td key={day.id}>
            <div className="form-check">
                <input className="form-check-input ms-auto float-none" type="checkbox" value="" id={`checkDefault-${day.id}`}
                    checked={day.accomplished} onChange={() => toggleCheckedTaskHandler?.(taskId, day.id)} />
                <label className="form-check-label" htmlFor={`checkDefault-${day.id}`} hidden>
                    Erledigt
                </label>
            </div>
        </td>
    );
}