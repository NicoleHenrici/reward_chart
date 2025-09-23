export type TaskRecord = {
  id?: number;
  taskTitle: string;
  week: WeekDay[];
  activeState: 1 | 0;
};

export type WeekDay = {
  id?: number
  dayIndex: number;
  day: string;
  accomplished: boolean;
}

