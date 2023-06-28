import { useCallback, useEffect, useRef, useState } from 'react';
import useTimeFormat from '../../../../Hooks/useTimeFormate';
import styles from './VideoStatus.module.css';

export default function VideoStatus({ videoRef, autoplay, status }) {
  const autoplayRef = useRef(autoplay);

  const formatTime = useTimeFormat();

  const [initialState, setInitialState] = useState({
    show: false,
    duration: 0,
  });

  const loadMetaDataUpdate = useCallback(({ target: { duration } }) => {
    setInitialState({ show: true, duration });
  }, []);

  const loadUpdate = useCallback(() => {
    if (autoplayRef.current) {
      videoRef.play();
      setInitialState((prev) => ({ ...prev, show: false }));
    }
  }, [videoRef]);

  const handleHideInitial = useCallback(() => {
    setInitialState((prev) => ({ ...prev, show: false }));
    videoRef.removeEventListener('play', handleHideInitial);
  }, [videoRef]);

  const initialBtnPlay = useCallback(() => {
    videoRef.play();
  }, [videoRef]);

  useEffect(() => {
    videoRef.addEventListener('loadedmetadata', loadMetaDataUpdate);
    videoRef.addEventListener('loadeddata', loadUpdate);
    videoRef.addEventListener('play', handleHideInitial);

    return () => {
      videoRef.removeEventListener('loadedmetadata', loadMetaDataUpdate);
      videoRef.removeEventListener('loadeddata', loadUpdate);
      videoRef.removeEventListener('play', handleHideInitial);
    };
  }, [handleHideInitial, loadMetaDataUpdate, loadUpdate, videoRef]);

  return (
    <>
      <div
        className={
          status.animation
            ? [styles.videoStatus, styles.fadeOut].join(' ')
            : styles.videoStatus
        }
      >
        <span {...(!status.play && { className: styles.marginLeft })}>
          <svg viewBox={status.play ? '0 0 10 14' : '0 0 11 14'}>
            <path
              d={
                status.play ? 'M0 14h3V0H0v14zM7 0v14h3V0H7z' : 'M0 0v14l11-7z'
              }
              fill="white"
            />
          </svg>
        </span>
      </div>
      {initialState.show && (
        <div className={styles.initialPlaceholder}>
          <button
            onClick={initialBtnPlay}
            type="button"
            className={styles.initialPlaceholderButton}
          >
            <span className={styles.svgContainer}>
              <svg viewBox="0 0 11 14">
                <path d="M0 0v14l11-7z" fill="black" fillRule="nonzero" />
              </svg>
            </span>
            <span>
              {initialState.duration
                ? formatTime(initialState.duration)
                : '0:00'}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
