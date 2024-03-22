import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Hooks/useDropDownHide';
import ScreenShadow from '../ScreenShadow/ScreenShadow';
import styles from './Modal.module.css';

const Modal = ({ children, setShow }) => {
  const [hideAnimation, setHideAnimation] = useState(false);

  const elementRef = useRef(null);

  const handleModalClose = () => {
    setHideAnimation(true);

    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  const { showMenu, setElement } = useDropDownHide(handleModalClose);

  useEffect(() => {
    setElement(elementRef.current);
    showMenu(true);
  }, [showMenu, setElement, setShow]);

  return (
    <>
      <div ref={elementRef} className={`${hideAnimation ? `${styles.hide} ` : ''}${styles.modal}`}>
        {children}
        <button onClick={handleModalClose} type="button" className={styles.crossBtn}>
          <span className={styles.cross} />
        </button>
      </div>
      <ScreenShadow show={!hideAnimation} />
    </>
  );
};
export default Modal;
