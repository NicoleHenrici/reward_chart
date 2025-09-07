export default function NewTask() {
    return (
        <>
            <form className="row g-3">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Neue Aufgabe</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}></textarea>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Neue Aufgabe hinzufügen</button>
                </div>
            </form>
        </>
    );
}