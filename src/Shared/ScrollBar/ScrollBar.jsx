import { useState } from 'react';
import styles from './ScrollBar.module.css';

const ScrollBar = () => {
  const [scrolled, setScrolled] = useState(0);

  return (
    <div className={styles.scrollBar}>
      <div className={styles.scrollThumb} />
    </div>
  );
};
export default ScrollBar;
