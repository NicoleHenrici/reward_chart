import { useEffect, useState } from "react";

type TableCellProps = {
    taskId: number;
    index: number;
    datePerWeekDay: Date[];
    checkedDate: Date[] | undefined;
    toggleCompletedItem: (taskId: number, date: Date, toDelete: boolean) => void;
};

export default function TableCell({ taskId, index, checkedDate, toggleCompletedItem, datePerWeekDay }: TableCellProps) {

    const [toggleItem, setToggleItem] = useState<boolean>(false);

    useEffect(() => {
        const isChecked = checkedDate?.find(el => el.toISOString().slice(0, 10) === datePerWeekDay[index].toISOString().slice(0, 10))
        if (isChecked) {
            setToggleItem(!toggleItem);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datePerWeekDay, checkedDate]);

    function toggleCheckHandler(taskId: number) {
        toggleCompletedItem(taskId, datePerWeekDay[index], toggleItem);

        setToggleItem(!toggleItem);
    }
    // console.log(datePerWeekDay[index].getTime());



    return (
        <td key={index}>
            <div className="form-check">
                <input className="form-check-input ms-auto float-none" type="checkbox" value="" id={`checkDefault-${index}`}
                    checked={toggleItem} onChange={() => toggleCheckHandler(taskId)} />
                <label className="form-check-label" htmlFor={`checkDefault-${taskId}`} hidden>
                    Erledigt
                </label>
            </div>
        </td>
    );
}