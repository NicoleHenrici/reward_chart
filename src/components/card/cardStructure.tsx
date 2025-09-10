import CardBody from "./cardBody";
import CardHeader from "./cardHeader";

type CardStructureProps = {
    score: number;
    tasksLength: number;
    title: string;
}

export default function CardStructure({ score, tasksLength, title }: CardStructureProps) {

    return (
        <div className="card">
            <CardHeader title={title} />
            <CardBody score={score} tasksLength={tasksLength} />
        </div>
    );
}