import React, { ReactNode } from 'react';
import styles from 'src/styles/Modal.module.scss';

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  children?: ReactNode,
}

const Modal = ({ children, setShowModal } : ModalProps) : JSX.Element => {
  return (
    <div
      className={styles.overlay}
      onClick={() => setShowModal(false)}
    >
      <div className={styles.modalBody}>
      {children}
      <button
        className={styles.modalClose}
        type="button"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
      </div>
    </div>
  )
}

export default Modal;