import { useCallback, useEffect, useRef, useState } from 'react';
import useTimeFormat from '../../../../../../Hooks/useTimeFormate';
import { useVideoPlayerProgress } from '../../../../../../Hooks/useVideoPlayerProgress';
import styles from './ProgressTimeShow.module.css';

export default function ProgressTimeShow({ video }) {
    const formatTime = useTimeFormat();

    const time = useVideoPlayerProgress();

    const videoRef = useRef(video.current);
    const eventRef = useRef(null);

    const [durationTime, setDurationTime] = useState(0);

    eventRef.loadUpdate = useCallback(({ target: { duration } }) => {
        setDurationTime(duration);
    }, []);

    useEffect(() => {
        if (video.current) {
            videoRef.current = video.current;
            videoRef.current.addEventListener('loadedmetadata', eventRef.loadUpdate);
        }

        return () => {
            videoRef.current.removeEventListener('loadedmetadata', eventRef.loadUpdate);
        };
    }, [video]);

    return (
        <div className={styles.progressTimeShow}>
            <p>
                {time && durationTime ? formatTime((time / 100) * durationTime) : '0:00'}/{durationTime ? formatTime(durationTime) : '0:00'}
            </p>
        </div>
    );
}
