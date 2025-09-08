export type TaskRecord = {
  id: number;
  task: string;
  week: Week[];
};

export type Week = {
  day: string;
  accomplished: boolean;
}

export type ModalProps = {
  children: React.ReactNode;
  customFn?: () => void;
};
