import styles from "./modal.module.css";
import { useState } from "react";

import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }){
const [isVisible, setIsVisible] = useState(true);

  function closeHandler() {
    setIsVisible(prevState => !prevState);
  }
  return (
    <>
    {isVisible && (
      <>
        <div className={styles.backdrop} onClick={closeHandler} />
        <dialog open className={styles.modal}>
          {children}
        </dialog>
      </>
    )}
    </>
  );
}