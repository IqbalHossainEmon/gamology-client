import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './PlayPauseButton.module.css';

export default function PlayPauseButton({ video, togglePausePlay, isSeekedRef, canPlay }) {
    const [isPlaying, setIsPlaying] = useState(false),
     isPlayingRef = useRef(isPlaying);
    isPlayingRef.current = isPlaying;

    const eventRefs = useRef({
        handlePlay: () => {},
        handlePause: () => {},
    });

    eventRefs.current.handlePlay = useCallback(() => {
        if (isSeekedRef.current && !isPlayingRef.current) {
            setIsPlaying(true);
        }
    }, [isSeekedRef]);

    eventRefs.current.handlePause = useCallback(() => {
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

        const { handlePlay, handlePause } = eventRefs.current;

        if (video.current) {
            videoRef = video.current;
            videoRef.addEventListener('play', handlePlay);
            videoRef.addEventListener('pause', handlePause);
        }

        return () => {
            if (videoRef) {
                videoRef.removeEventListener('play', handlePlay);
                videoRef.removeEventListener('pause', handlePause);
            }
        };
    }, [video]);

    return (
        <button
            className={styles.playPauseButton}
            onClick={handleCanToggle}
            type="button"
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
