import { useCallback, useEffect, useRef } from 'react';

import useDragStartStop from '../../../../../../Hooks/useDragStartStop';
import useScreenWidth from '../../../../../../Hooks/useScreenWidth';
import styles from './VideoSlider.module.css';

export default function VideoSlider({
  position,
  setPosition,
  isBuffer,
  buffer,
  isFullScreen,
}) {
  const stateRef = useRef(position);
  stateRef.current = position;
  const pathRef = useRef(null);
  const isDragging = useRef(false);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    pathRef.width = pathRef.current?.offsetWidth;
    pathRef.offsetLeft = pathRef.current.getBoundingClientRect().left;
  }, [pathRef, screenWidth, isFullScreen]);

  const onMouseEvent = useCallback(
    (e) => {
      isDragging.current = true;
      const cursorInPercent =
        ((e?.touches
          ? e.touches[0].pageX - pathRef.offsetLeft
          : e.pageX - pathRef.offsetLeft) /
          pathRef.width) *
        100;

      if (cursorInPercent >= 0 && cursorInPercent <= 100) {
        setPosition(cursorInPercent);
      } else if (cursorInPercent < 0 && stateRef.current !== 0) {
        setPosition(0);
      } else if (cursorInPercent > 100 && stateRef.current !== 100) {
        setPosition(100);
      }
    },
    [setPosition],
  );

  const handleClick = (e) => {
    if (!isDragging.current) {
      onMouseEvent(e);
    }
    isDragging.current = false;
  };

  const onStart = useDragStartStop(onMouseEvent, handleClick);

  return (
    <div
      ref={pathRef}
      tabIndex="0"
      role="button"
      onMouseDown={onStart}
      onTouchStart={onStart}
      className={styles.videoSliderPath}
    >
      <div className={styles.path} />
      <div
        style={{ scale: `${position / 100} 1` }}
        className={styles.activePath}
      />
      {isBuffer && (
        <div
          style={{ scale: `${buffer / 100} 1` }}
          className={styles.preloadedPath}
        />
      )}
      <div
        style={{ translate: `${position}%` }}
        className={styles.knobContainer}
      >
        <div className={styles.knob} />
      </div>
    </div>
  );
}
