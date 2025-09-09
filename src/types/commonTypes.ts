export type TaskRecord = {
  id: number;
  task: string;
  week: Week[];
};

export type Week = {
  id: number;
  day: string;
  accomplished: boolean;
}

export type ModalProps = {
  children: React.ReactNode;
  customFn?: () => void;
};
