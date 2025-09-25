export type TaskRecord = {
  id?: number;
  title: string;
  active: 1 | 0;
};

export type CompletedItem = {
    item: {[taskId: number]: Date[]};
} 