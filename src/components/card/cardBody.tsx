import Progressbar from "../progress/progressbar";

type CardBodyProps = {
    score: number;
    tasksLength: number;
}

export default function CardBody({ score, tasksLength }: CardBodyProps) {
    const scoreInPercent = Math.floor(tasksLength > 0 ? (score / (tasksLength * 7)) * 100 : 0);
    return (
        <div className="card-body">
            <p className="card-text"><span className="fw-bold">Wochen&shy;punkte:</span> {score}</p>
            <p className="card-text fw-bold"> Aktueller Fortschritt:</p>
            <Progressbar valueNow={scoreInPercent} styleWidth={scoreInPercent.toString()} />
            {/* todo: sum up all overall points */}
            <p className="card-text"><span className="fw-bold">Gesamt:</span> *overall points*</p>
        </div>
    );
}