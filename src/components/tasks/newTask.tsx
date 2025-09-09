import { TaskRecord } from "@/types/commonTypes";
import { useRef } from "react";

type NewTaskProps = {
    newTaskHandler: (task: TaskRecord) => void;
};


export default function NewTask({ newTaskHandler }: NewTaskProps) {

    const inputTextRef = useRef<HTMLTextAreaElement>(null);

    function addTaskHandler(event: React.FormEvent) {
        event.preventDefault();

        const newTask = inputTextRef.current?.value;

        const task = {
            id: Math.random(),
            task: newTask || "",
            week: [
                {id: 1, day: 'monday', accomplished: false},
                {id: 2, day: 'tuesday', accomplished: false},
                {id: 3, day: 'wednesday', accomplished: false},
                {id: 4, day: 'thursday', accomplished: false},
                {id: 5, day: 'friday', accomplished: false},
                {id: 6, day: 'saturday', accomplished: false},
                {id: 7, day: 'sunday', accomplished: false},
            ]
        }

        newTaskHandler(task);
    }

    return (
        <>
            <form className="row g-3 p-3" onSubmit={addTaskHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Neue Aufgabe</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} ref={inputTextRef}></textarea>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Neue Aufgabe hinzufügen</button>
                </div>
            </form>
        </>
    );
}