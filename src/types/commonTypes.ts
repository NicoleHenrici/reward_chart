export type TaskRecord = {
  id: number;
  task: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
};

export type ModalProps = {
  children: React.ReactNode;
  customFn?: () => void;
};
