import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../../../../../../../Hooks/useDropDownHide';
import styles from './CardDot.module.css';

const CardDot = ({ className, setModal, item }) => {
  const [show, setShow] = useState(false);

  const elementRef = useRef(null);

  const { showMenu, setElement } = useDropDownHide(setShow);

  console.log();

  useEffect(() => {
    setElement(elementRef.current);
  }, [setElement]);

  return (
    <div ref={elementRef} className={className} {...(show && { id: styles.show })}>
      <button
        onClick={() => {
          setShow(prev => !prev);
          showMenu(true);
        }}
        className={styles.btnDot}
        type="button"
      >
        <svg
          viewBox="0 0 32 32"
          enableBackground="new 0 0 32 32"
          version="1.1"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
        >
          <g strokeWidth="0" />
          <g strokeLinecap="round" strokeLinejoin="round" />
          <g>
            <circle cx="16" cy="16" fill="#F08A5D" r="2" />
            <circle cx="16" cy="26" fill="#B83B5E" r="2" />
            <circle cx="16" cy="6" fill="#B83B5E" r="2" />
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="2"
              stroke="#200F60"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="0.00032"
            />
            <circle
              cx="16"
              cy="26"
              fill="#F9ED69"
              r="2"
              stroke="#200F60"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="0.00032"
            />
            <circle
              cx="16"
              cy="6"
              fill="none"
              r="2"
              stroke="#200F60"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="0.00032"
            />
          </g>
        </svg>
      </button>
      {show && (
        <ul className={styles.listContainer}>
          <li>
            <button type="button">Edit</button>
          </li>
          <li>
            <button type="button" onClick={() => setModal({ show: true, type: 'price', detail: item })}>
              Price
            </button>
          </li>
          <li>
            <button type="button" onClick={() => setModal({ show: true, type: 'delete', detail: item })}>
              Delete
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
export default CardDot;
