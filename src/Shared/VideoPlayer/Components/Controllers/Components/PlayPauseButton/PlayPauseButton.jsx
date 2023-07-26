import { useCallback, useEffect, useState } from 'react';

import styles from './PlayPauseButton.module.css';

export default function PlayPauseButton({
  videoRef,
  togglePausePlay,
  isSeekedRef,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    if (isSeekedRef.current) {
      setIsPlaying(true);
    }
  }, [isSeekedRef]);

  const handlePause = useCallback(() => {
    if (isSeekedRef.current) {
      setIsPlaying(false);
    }
  }, [isSeekedRef]);

  useEffect(() => {
    videoRef.addEventListener('play', handlePlay);
    videoRef.addEventListener('pause', handlePause);
    return () => {
      videoRef.removeEventListener('play', handlePlay);
      videoRef.removeEventListener('pause', handlePause);
    };
  }, [handlePause, handlePlay, videoRef]);

  return (
    <button
      type="button"
      onClick={togglePausePlay}
      className={styles.playPauseButton}
    >
      <span>
        <svg viewBox={isPlaying ? '0 0 10 14' : '0 0 11 14'}>
          <path
            d={isPlaying ? 'M0 14h3V0H0v14zM7 0v14h3V0H7z' : 'M0 0v14l11-7z'}
            fill="white "
            fillRule="nonzero"
          />
        </svg>
      </span>
    </button>
  );
}
