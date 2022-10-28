import { useRef } from 'react';
import styles from './Button.module.css';

export default function Button({ handleClick, className }) {
  const timeOutRef = useRef(false);
  const handleDebuncingClick = () => {
    if (!timeOutRef.current) {
      handleClick();
      timeOutRef.current = true;
      setTimeout(() => {
        timeOutRef.current = false;
      }, 400);
    }
  };

  return (
    <button className={className} type="button" onClick={handleDebuncingClick}>
      <svg
        className={styles.btnImg}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 490 490"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <g>
              <polygon points="0,249.888 245.004,8.139 490,249.888 490,481.861 245.004,239.71 0,481.861 			" />
            </g>
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </g>
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </svg>
    </button>
  );
}
