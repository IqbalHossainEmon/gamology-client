import { useEffect, useState } from 'react';
import styles from './RotateArrow.module.css';

export default function RotateArrow({ state }) {
  const [style, setStyle] = useState();
  useEffect(() => {
    if (state) {
      setStyle(styles.arrowDown);
    } else if (state === false) {
      setStyle(styles.arrowUp);
    }
  }, [state]);
  return (
    <svg className={styles.RotateArrow} id={style} fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
    </svg>
  );
}
