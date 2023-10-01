import { useCallback, useEffect, useRef, useState } from 'react';
import useTimeFormat from '../../../../../../Hooks/useTimeFormate';
import CircularSpinner from '../../../../../CircularSpinner/CircularSpinner';
import styles from './VideoStatus.module.css';

export default function VideoStatus({ video, isSeekedRef, isChanging }) {
  const formatTime = useTimeFormat();
  const timerId = useRef(null);
  const videoRef = useRef(video.current);

  const [status, setStatus] = useState({
    duration: 0,
    initialShow: true,
    loading: false,
  });

  const handleTransition = () => {
    if (!timerId.current) {
      timerId.current = setTimeout(() => {
        timerId.current = null;
        setStatus((prev) => ({ ...prev, animation: false }));
      }, 500);
    }
  };

  const loadMetaDataUpdate = useCallback(({ target: { duration } }) => {
    setStatus((prev) => ({ ...prev, duration }));
  }, []);

  const loadUpdate = useCallback(() => {
    if (localStorage.getItem('autoplay') && videoRef.current.paused) {
      videoRef.current.play();
    }
  }, []);

  const handlePlay = useCallback(() => {
    if (isSeekedRef.current) {
      setStatus((prev) => {
        if (!prev.initialShow) {
          return { play: true, animation: true, loading: false };
        }
        return {};
      });
      handleTransition();
    }
  }, [isSeekedRef]);

  const handlePause = useCallback(() => {
    if (isSeekedRef.current && !videoRef.current.ended && !isChanging.current) {
      setStatus({ play: false, animation: true, loading: false });
      handleTransition();
    }
    if (isChanging.current) {
      isChanging.current = false;
    }
  }, [isChanging, isSeekedRef]);

  const initialBtnPlay = useCallback(() => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    }
  }, []);

  const handlePlaying = useCallback(() => {
    setStatus((prev) => ({ ...prev, loading: false }));
  }, []);

  const handleWaiting = useCallback(() => {
    setStatus((prev) => ({ ...prev, loading: true }));
  }, []);

  useEffect(() => {
    if (video.current) {
      videoRef.current = video.current;

      videoRef.current.addEventListener('loadedmetadata', loadMetaDataUpdate);
      videoRef.current.addEventListener('loadeddata', loadUpdate);
      videoRef.current.addEventListener('play', handlePlay);
      videoRef.current.addEventListener('pause', handlePause);
      videoRef.current.addEventListener('playing', handlePlaying);
      videoRef.current.addEventListener('waiting', handleWaiting);
    }

    return () => {
      videoRef.current.removeEventListener(
        'loadedmetadata',
        loadMetaDataUpdate,
      );
      videoRef.current.removeEventListener('loadeddata', loadUpdate);
      videoRef.current.removeEventListener('play', handlePlay);
      videoRef.current.removeEventListener('pause', handlePause);
      videoRef.current.removeEventListener('playing', handlePlaying);
      videoRef.current.removeEventListener('waiting', handleWaiting);
    };
  }, [
    handlePlaying,
    handlePause,
    handlePlay,
    handleWaiting,
    loadMetaDataUpdate,
    loadUpdate,
    video,
  ]);

  return (
    <>
      {!status.initialShow && !status.animation && status.loading && (
        <div>
          <CircularSpinner />
        </div>
      )}
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
      {status.initialShow && status.duration > 0 && (
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
