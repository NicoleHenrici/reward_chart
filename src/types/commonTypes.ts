export type TaskRecord = {
  id: number;
  task: string;
  accomplishedDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  }
};

export type ModalProps = {
  children: React.ReactNode;
  customFn?: () => void;
};
