"use client";

import { TaskRecord } from "@/types/commonTypes";
import { GoSmiley } from "react-icons/go";
import { MdDelete } from "react-icons/md";

type TableRowProps = {
  task: TaskRecord;
  removeTask: (id: number) => void;
};

export default function TableRow({task, removeTask}: TableRowProps) {

    return (
        <tr key={task.id}>
            <th scope="row">{task.task}</th>
            {task.week.map((day, index) => (
                <td key={index}>{day.accomplished ? <GoSmiley /> : "x"}</td>
            ))}
            <td><button type="button" className="btn btn-link" onClick={() => removeTask(task.id)}><MdDelete /></button></td>
        </tr>
    );
}