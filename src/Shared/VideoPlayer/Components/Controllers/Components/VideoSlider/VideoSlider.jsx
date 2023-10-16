import { useCallback, useEffect, useRef } from 'react';

import useDragStartStop from '../../../../../../Hooks/useDragStartStop';
import useScreenWidth from '../../../../../../Hooks/useScreenWidth';
import styles from './VideoSlider.module.css';

export default function VideoSlider({
  position,
  setPosition,
  isBuffer,
  buffer,
  videoContainer,
  changePause,
  handleMouseUp = () => {},
  handleMouseDown = () => {},
}) {
  const stateRef = useRef(position);
  stateRef.current = position;
  const pathRef = useRef(null);
  const screenWidth = useScreenWidth();

  const handleResize = useCallback(() => {
    pathRef.width = pathRef.current?.offsetWidth;
    pathRef.offsetLeft = pathRef.current.getBoundingClientRect().left;
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize, screenWidth]);

  useEffect(() => {
    setTimeout(() => {
      handleResize();
    }, 250);
  }, [changePause, handleResize]);

  useEffect(() => {
    let videoContainerRef;

    if (videoContainer.current) {
      videoContainer.current.addEventListener('fullscreenchange', handleResize);
      videoContainer.current.addEventListener('mozfullscreenchange', handleResize);
      videoContainer.current.addEventListener('MSFullscreenChange', handleResize);
      videoContainer.current.addEventListener('webkitfullscreenchange', handleResize);

      videoContainerRef = videoContainer.current;
    }

    return () => {
      videoContainerRef.removeEventListener('fullscreenchange', handleResize);
      videoContainerRef.removeEventListener('mozfullscreenchange', handleResize);
      videoContainerRef.removeEventListener('MSFullscreenChange', handleResize);
      videoContainerRef.removeEventListener('webkitfullscreenchange', handleResize);
    };
  }, [handleResize, videoContainer]);

  // get cursor position while dragging
  const onMouseEvent = useCallback(
    e => {
      let cursorInPercent =
        ((e?.touches ? e.touches[0].pageX - pathRef.offsetLeft : e.pageX - pathRef.offsetLeft) /
          pathRef.width) *
        100;

      if (cursorInPercent < 0) {
        cursorInPercent = 0;
      } else if (cursorInPercent > 100) {
        cursorInPercent = 100;
      }
      if (parseFloat(cursorInPercent.toFixed(3)) !== parseFloat(stateRef.current.toFixed(3))) {
        setPosition(cursorInPercent);
      }
    },
    [setPosition]
  );

  const handleMouseDownClick = useCallback(
    e => {
      onMouseEvent(e);
      handleMouseDown();
    },
    [handleMouseDown, onMouseEvent]
  );

  const onStart = useDragStartStop(onMouseEvent, handleMouseUp, handleMouseDownClick, false);

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
      <div style={{ scale: `${position / 100} 1` }} className={styles.activePath} />
      {isBuffer && <div style={{ scale: `${buffer / 100} 1` }} className={styles.bufferPath} />}
      <div style={{ translate: `${position}%` }} className={styles.knobContainer}>
        <div className={styles.knob} />
      </div>
    </div>
  );
}
