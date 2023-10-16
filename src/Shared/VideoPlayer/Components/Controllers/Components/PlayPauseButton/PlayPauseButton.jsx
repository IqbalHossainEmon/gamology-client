import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './PlayPauseButton.module.css';

export default function PlayPauseButton({ video, togglePausePlay, isSeekedRef, canPlay }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const handlePlay = useCallback(() => {
    if (isSeekedRef.current && !isPlayingRef.current) {
      setIsPlaying(true);
    }
  }, [isSeekedRef]);

  const handlePause = useCallback(() => {
    if (isSeekedRef.current && isPlayingRef.current) {
      setIsPlaying(false);
    }
  }, [isSeekedRef]);

  const handleCanToggle = () => {
    if (canPlay.current) {
      togglePausePlay();
    } else if (isPlayingRef.current) {
      setIsPlaying(false);
      togglePausePlay();
    }
  };

  useEffect(() => {
    let videoRef;
    if (video.current) {
      videoRef = video.current;
      videoRef.addEventListener('play', handlePlay);
      videoRef.addEventListener('pause', handlePause);
    }

    return () => {
      videoRef.removeEventListener('play', handlePlay);
      videoRef.removeEventListener('pause', handlePause);
    };
  }, [handlePause, handlePlay, video]);

  return (
    <button type="button" onClick={handleCanToggle} className={styles.playPauseButton}>
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
