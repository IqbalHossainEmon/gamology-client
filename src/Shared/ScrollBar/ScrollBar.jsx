import { useCallback, useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../Hooks/useDragStartStop';
import styles from './ScrollBar.module.css';

const ScrollBar = ({ parentRef, childRef }) => {
  const [scrolled, setScrolled] = useState(0);
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);

  const thumbRef = useRef(null);
  const downElement = useRef(null);

  const handleMove = useCallback(e => {
    const cursorInEle = e?.touches
      ? e.touches[0].pageY - thumbRef.current.getBoundingClientRect().y
      : e.pageY - thumbRef.current.getBoundingClientRect().y;

    downElement.current = cursorInEle;
  }, []);

  const handleMouseUp = useCallback(() => {
    downElement.current = null;
  }, []);

  const onStart = useDragStartStop(handleMove, handleMouseUp);

  useEffect(() => {
    setHeight((parentRef.current.scrollHeight / childRef.current.scrollHeight) * 100);
  }, [childRef, parentRef]);

  console.log(parentRef, childRef, childRef.current?.scrollHeight, parentRef.current?.scrollHeight);

  return !parentRef || !childRef || childRef.current?.scrollHeight <= parentRef.current?.scrollHeight ? null : (
    <div className={styles.scrollBarContainer}>
      <button
        ref={thumbRef}
        onMouseDown={onStart}
        onTouchStart={onStart}
        type="button"
        style={{ height: `${height}%` }}
        className={styles.scrollThumb}
      />
    </div>
  );
};
export default ScrollBar;
