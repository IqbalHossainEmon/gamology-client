import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './PlayPauseButton.module.css';

export default function PlayPauseButton({ video, togglePausePlay, isSeekedRef, canPlay }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;

    const eventRef = useRef(null);

    eventRef.handlePlay = useCallback(() => {
        if (isSeekedRef.current && !isPlayingRef.current) {
            setIsPlaying(true);
        }
    }, [isSeekedRef]);

    eventRef.handlePause = useCallback(() => {
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
            videoRef.addEventListener('play', eventRef.handlePlay);
            videoRef.addEventListener('pause', eventRef.handlePause);
        }

        return () => {
            if (videoRef) {
                videoRef.removeEventListener('play', eventRef.handlePlay);
                videoRef.removeEventListener('pause', eventRef.handlePause);
            }
        };
    }, [video]);

    return (
        <button type="button" onClick={handleCanToggle} className={styles.playPauseButton}>
            <span>
                <svg viewBox={isPlaying ? '0 0 10 14' : '0 0 11 14'}>
                    <path d={isPlaying ? 'M0 14h3V0H0v14zM7 0v14h3V0H7z' : 'M0 0v14l11-7z'} fill="white " fillRule="nonzero" />
                </svg>
            </span>
        </button>
    );
}
