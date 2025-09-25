import { TaskRecord } from "@/types/commonTypes";
import { useRef } from "react";

type NewTaskProps = {
    createNewTask: (task: TaskRecord) => void;
    showModalHandler: () => void;
};


export default function NewTask({ createNewTask, showModalHandler }: NewTaskProps) {

    const inputTextRef = useRef<HTMLTextAreaElement>(null);

    function addTaskHandler(event: React.FormEvent) {
        event.preventDefault();

        const newTask = inputTextRef.current?.value;

        const task = {
            title: newTask || "",
            active: 1 as 0 | 1
        }

        createNewTask(task);

        showModalHandler();
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