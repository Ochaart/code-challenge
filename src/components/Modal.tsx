import React from 'react';
import styles from 'src/styles/Modal.module.scss';

const Modal = ({ children, setShowModal }) => {
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