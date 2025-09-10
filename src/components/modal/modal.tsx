import styles from "./modal.module.css";


export type ModalProps = {
  children: React.ReactNode;
  customFn?: () => void;
};

export default function Modal({ children, customFn }: ModalProps) {


  return (
    <>
      <div className={styles.backdrop} onClick={customFn} />
      <dialog open className={`m-auto ${styles.modal}`}>
        {children}
      </dialog>
    </>
  );
}