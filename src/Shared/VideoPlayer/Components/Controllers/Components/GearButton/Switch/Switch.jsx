import { useCallback, useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../../../../../../Hooks/useDragStartStop';
import useHandleTimerTransition from '../../../../../../../Hooks/useHandleTimerTransition';
import useScreenWidth from '../../../../../../../Hooks/useScreenWidth';
import styles from './Switch.module.css';

function Switch({ state, setState, event, videoContainer }) {
  const rangePathRef = useRef();
  const [circlePosition, setCirclePosition] = useState({
    translate: state ? 100 : 0,
    transition: false,
  });

  const stateRef = useRef(circlePosition);
  stateRef.current = circlePosition.translate;

  const pathInfoRef = useRef();
  const screenWidth = useScreenWidth();

  const handleResize = useCallback(() => {
    pathInfoRef.width = rangePathRef.current?.offsetWidth;
    pathInfoRef.offsetLeft = rangePathRef.current.getBoundingClientRect().left;
  }, []);

  useEffect(() => {
    handleResize();
  }, [handleResize, screenWidth]);

  useEffect(() => {
    let videoContainerRef;
    if (videoContainer.current) {
      videoContainerRef = videoContainer.current;

      videoContainerRef.addEventListener('fullscreenchange', handleResize);
      videoContainerRef.addEventListener('mozfullscreenchange', handleResize);
      videoContainerRef.addEventListener('MSFullscreenChange', handleResize);
      videoContainerRef.addEventListener('webkitfullscreenchange', handleResize);
    }
    return () => {
      videoContainerRef.removeEventListener('fullscreenchange', handleResize);
      videoContainerRef.removeEventListener('mozfullscreenchange', handleResize);
      videoContainerRef.removeEventListener('MSFullscreenChange', handleResize);
      videoContainerRef.removeEventListener('webkitfullscreenchange', handleResize);
    };
  }, [handleResize, videoContainer]);

  const handleTimerTransition = useHandleTimerTransition(setCirclePosition, 100);

  useEffect(() => {
    if (state) {
      setCirclePosition({ translate: 100, transition: true });
      handleTimerTransition();
    } else {
      setCirclePosition({ translate: 0, transition: true });
      handleTimerTransition();
    }
  }, [handleTimerTransition, state]);

  const handleMove = useCallback(
    e => {
      document.removeEventListener('mouseup', event);

      const cursorInEle = e?.touches ? e.touches[0].pageX - pathInfoRef.offsetLeft : e.pageX - pathInfoRef.offsetLeft;

      const cursorInPercent = (cursorInEle / pathInfoRef.width) * 100;
      // if cursors position is inside the slider range;

      if (cursorInPercent > 0 && cursorInPercent < 100) {
        // check and set value depend on step
        setCirclePosition(prev => ({ ...prev, translate: cursorInPercent }));
      } else if (cursorInPercent <= 0 && stateRef.current !== 0) {
        setCirclePosition(prev => ({ ...prev, translate: 0 }));
      } else if (cursorInPercent >= 100 && stateRef.current !== 100) {
        setCirclePosition(prev => ({ ...prev, translate: 100 }));
      }
    },
    [event]
  );

  const handleSetValue = useCallback(() => {
    // if switch is below 50
    if (stateRef.current < 50) {
      if (state) {
        setState(() => {
          localStorage.removeItem('autoplay');
          return false;
        });
      } else if (stateRef.current !== 0) {
        setCirclePosition({ translate: 0, transition: true });
        handleTimerTransition();
      }
    } else if (stateRef.current >= 50) {
      if (!state) {
        setState(() => {
          localStorage.setItem('autoplay', true);
          return true;
        });
      } else if (stateRef.current !== 100) {
        setCirclePosition({ translate: 100, transition: true });
        handleTimerTransition();
      }
    }
  }, [handleTimerTransition, setState, state]);

  const onStart = useDragStartStop(handleMove, handleSetValue);

  return (
    <div ref={rangePathRef} className={styles.toggleButton}>
      <div className={styles.activePathContainer}>
        <div
          className={styles.activePath}
          style={
            circlePosition.transition
              ? {
                  scale: `${circlePosition.translate / 100} 1`,
                  transition: 'scale linear 100ms',
                }
              : { scale: `${circlePosition.translate / 100} 1` }
          }
        />
      </div>
      <div
        className={styles.roundContainer}
        style={
          circlePosition.transition
            ? {
                translate: `${circlePosition.translate}%`,
                transition: 'translate linear 100ms',
              }
            : { translate: `${circlePosition.translate}%` }
        }
      >
        <div
          tabIndex="0"
          role="button"
          className={styles.round}
          style={
            circlePosition.transition
              ? {
                  backgroundColor: `rgb(${(circlePosition.translate / 100) * 202}, ${
                    (circlePosition.translate / 100) * 150
                  }, 0)`,
                  transition: 'translate linear 100ms',
                }
              : {
                  backgroundColor: `rgb(${(circlePosition.translate / 100) * 202}, ${
                    (circlePosition.translate / 100) * 150
                  }, 0)`,
                }
          }
          onTouchStart={onStart}
          onMouseDown={onStart}
        />
      </div>
    </div>
  );
}

export default Switch;
