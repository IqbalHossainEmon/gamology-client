import { useCallback, useEffect, useRef, useState } from 'react';
import useTimeFormat from '../../../../../../Hooks/useTimeFormate';
import styles from './VideoStatus.module.css';

export default function VideoStatus({ videoRef, isSeekedRef }) {
  const formatTime = useTimeFormat();
  const timerId = useRef(null);

  const [status, setStatus] = useState({ duration: 0, initialShow: true });

  const handleTransition = () => {
    if (!timerId.current) {
      timerId.current = setTimeout(() => {
        clearTimeout(timerId);
        timerId.current = null;
        setStatus((prev) => ({ ...prev, animation: false }));
      }, 500);
    }
  };

  const loadMetaDataUpdate = useCallback(({ target: { duration } }) => {
    setStatus((prev) => ({ ...prev, duration }));
  }, []);

  const loadUpdate = useCallback(() => {
    if (localStorage.getItem('autoplay')) {
      videoRef.play();
    }
  }, [videoRef]);

  const handlePlay = useCallback(() => {
    if (isSeekedRef.current) {
      setStatus((prev) => {
        if (!prev.initialShow) {
          return { play: true, animation: true };
        }
        return {};
      });
      handleTransition();
    } else {
      isSeekedRef.current = true;
    }
  }, [isSeekedRef]);

  const handlePause = useCallback(() => {
    if (isSeekedRef.current && !videoRef.ended) {
      setStatus({ play: false, animation: true });
      handleTransition();
    }
  }, [isSeekedRef, videoRef]);

  const initialBtnPlay = useCallback(() => {
    videoRef.play();
  }, [videoRef]);

  useEffect(() => {
    videoRef.addEventListener('loadedmetadata', loadMetaDataUpdate);
    videoRef.addEventListener('loadeddata', loadUpdate);
    videoRef.addEventListener('play', handlePlay);
    videoRef.addEventListener('pause', handlePause);

    return () => {
      videoRef.removeEventListener('loadedmetadata', loadMetaDataUpdate);
      videoRef.removeEventListener('loadeddata', loadUpdate);
      videoRef.removeEventListener('play', handlePlay);
      videoRef.removeEventListener('pause', handlePause);
    };
  }, [handlePause, handlePlay, loadMetaDataUpdate, loadUpdate, videoRef]);

  return (
    <>
      {!status.initialShow && (
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
                  status.play
                    ? 'M0 14h3V0H0v14zM7 0v14h3V0H7z'
                    : 'M0 0v14l11-7z'
                }
                fill="white"
              />
            </svg>
          </span>
        </div>
      )}
      {status.initialShow && (
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
              {status.duration ? formatTime(status.duration) : '0:00'}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
