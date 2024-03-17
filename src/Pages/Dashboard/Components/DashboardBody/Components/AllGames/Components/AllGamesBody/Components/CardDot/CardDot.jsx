import { useState } from 'react';
import styles from './CardDot.module.css';

const CardDot = ({ className }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => {
          setShow(prev => !prev);
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
        <ul>
          <li />
          <li />
          <li />
        </ul>
      )}
    </div>
  );
};
export default CardDot;
