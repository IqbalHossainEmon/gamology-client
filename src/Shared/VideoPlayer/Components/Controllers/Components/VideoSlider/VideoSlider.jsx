import { useCallback, useEffect, useRef } from 'react';

import useDragStartStop from '../../../../../../Hooks/useDragStartStop';
import useScreenWidth from '../../../../../../Hooks/useScreenWidth';
import styles from './VideoSlider.module.css';

export default function VideoSlider({
  setValue = () => {},
  position,
  setPosition,
  buffer,
  isFullScreen,
}) {
  const stateRef = useRef(position);
  stateRef.current = position;
  const pathRef = useRef(null);
  const isDraggingRef = useRef(false);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    pathRef.width = pathRef.current?.offsetWidth;
    pathRef.offsetLeft = pathRef.current.getBoundingClientRect().left;
  }, [pathRef, screenWidth, isFullScreen]);

  const getCursorInPercent = (e) =>
    ((e?.touches
      ? e.touches[0].pageX - pathRef.offsetLeft
      : e.pageX - pathRef.offsetLeft) /
      pathRef.width) *
    100;

  const onMove = useCallback(
    (e) => {
      isDraggingRef.current = true;
      const cursorInPercent = getCursorInPercent(e);

      if (cursorInPercent >= 0 && cursorInPercent <= 100) {
        setPosition((prev) => ({ ...prev, progress: cursorInPercent }));
        setValue(cursorInPercent);
        return;
      }
      if (cursorInPercent < 0 && stateRef.current.progress !== 0) {
        setPosition((prev) => ({ ...prev, progress: 0 }));
        setValue(0);
        return;
      }
      if (cursorInPercent > 100 && stateRef.current.progress !== 100) {
        setPosition((prev) => ({ ...prev, progress: 100 }));
        setValue(100);
      }
    },
    [setPosition, setValue],
  );

  const handleClick = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }
    const cursorInPercent = getCursorInPercent(e);
    if (position.progress !== cursorInPercent) {
      setPosition((prev) => ({ ...prev, progress: cursorInPercent }));
      setValue(cursorInPercent);
    }
  };

  const onStart = useDragStartStop(onMove, handleClick);

  return (
    <div
      ref={pathRef}
      tabIndex="0"
      role="button"
      onMouseDown={onStart}
      onTouchStart={onStart}
      onClick={handleClick}
      className={styles.videoSliderPath}
    >
      <div className={styles.path} />
      <div
        style={{ scale: `${position.progress / 100} 1` }}
        className={styles.activePath}
      />
      {buffer && (
        <div
          style={{ scale: `${position.buffer / 100} 1` }}
          className={styles.preloadedPath}
        />
      )}
      <div
        style={{ translate: `${position.progress}%` }}
        className={styles.knobContainer}
      >
        <div className={styles.knob} />
      </div>
    </div>
  );
}
