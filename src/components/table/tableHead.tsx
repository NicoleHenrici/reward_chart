type TableHeadProps = {
    datePerWeekDay: Date[];
};

export default function TableHead({ datePerWeekDay }: TableHeadProps) {
    const dayName: string[] = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

    return (
        <thead>
            <tr>
                <th scope="col">AUFGABE</th>
                {datePerWeekDay.map((day, index) => (
                    <th scope="col" key={index}>
                        <p className="mb-0">{dayName[(index % dayName.length)]}</p>
                        <p><small>{day.getDate()}.{day.getMonth() + 1}.{day.getFullYear()}</small></p>
                    </th>
                ))}
            </tr>
        </thead>
    );
}