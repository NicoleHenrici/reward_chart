export type TaskRecord = {
  id: number;
  task: string;
  week: WeekDay[];
};

export type WeekDay = {
  id: number;
  day: string;
  accomplished: boolean;
}

