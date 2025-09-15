export type TaskRecord = {
  id: number;
  taskTitle: string;
  week: WeekDay[];
};

export type WeekDay = {
  id: number;
  day: string;
  accomplished: boolean;
}

