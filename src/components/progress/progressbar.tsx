
type ProgressbarProps = {
    valueNow: number;
    valueMin?: number;
    valueMax?: number;
    styleWidth: string;
};

export default function Progressbar({ valueNow, valueMin, valueMax, styleWidth }: ProgressbarProps) {
    return (
        <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow={valueNow} aria-valuemin={valueMin ? valueMin : 0} 
        aria-valuemax={valueMax ? valueMax : 100}>
            <div className="progress-bar text-bg-success" style={{ width: `${styleWidth}%` }}>{styleWidth}%</div>
        </div>
    );
}