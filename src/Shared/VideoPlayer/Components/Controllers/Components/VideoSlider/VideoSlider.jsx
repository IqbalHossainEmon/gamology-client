import { useCallback, useEffect, useRef } from 'react';

import useDragStartStop from '../../../../../../Hooks/useDragStartStop';
import useScreenWidth from '../../../../../../Hooks/useScreenWidth';
import styles from './VideoSlider.module.css';

export default function VideoSlider({
  position,
  setPosition,
  isBuffer,
  buffer,
  handleSingleClick = () => {},
  videoContainerRef,
}) {
  const stateRef = useRef(position);
  stateRef.current = position;
  const pathRef = useRef(null);
  const isDragging = useRef(false);
  const screenWidth = useScreenWidth();

  const handleResize = useCallback(() => {
    pathRef.width = pathRef.current?.offsetWidth;
    pathRef.offsetLeft = pathRef.current.getBoundingClientRect().left;
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize, screenWidth]);

  useEffect(() => {
    videoContainerRef.addEventListener('fullscreenchange', handleResize);
    videoContainerRef.addEventListener('mozfullscreenchange', handleResize);
    videoContainerRef.addEventListener('MSFullscreenChange', handleResize);
    videoContainerRef.addEventListener('webkitfullscreenchange', handleResize);
    return () => {
      videoContainerRef.removeEventListener('fullscreenchange', handleResize);
      videoContainerRef.removeEventListener(
        'mozfullscreenchange',
        handleResize,
      );
      videoContainerRef.removeEventListener('MSFullscreenChange', handleResize);
      videoContainerRef.removeEventListener(
        'webkitfullscreenchange',
        handleResize,
      );
    };
  }, [handleResize, videoContainerRef]);

  // get cursor position while dragging
  const onMouseEvent = useCallback(
    (e, singleClick = false) => {
      isDragging.current = true;
      let cursorInPercent =
        ((e?.touches
          ? e.touches[0].pageX - pathRef.offsetLeft
          : e.pageX - pathRef.offsetLeft) /
          pathRef.width) *
        100;

      if (cursorInPercent < 0) {
        cursorInPercent = 0;
      } else if (cursorInPercent > 100) {
        cursorInPercent = 100;
      }
      if (
        parseFloat(cursorInPercent.toFixed(3)) !==
        parseFloat(stateRef.current.toFixed(3))
      ) {
        if (singleClick) handleSingleClick(cursorInPercent);
        else setPosition(cursorInPercent);
      }
    },
    [handleSingleClick, setPosition],
  );

  // get single click
  const handleClick = (e) => {
    if (!isDragging.current) {
      onMouseEvent(e, true);
    }
    isDragging.current = false;
  };

  const onStart = useDragStartStop(onMouseEvent, handleClick, false);

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
