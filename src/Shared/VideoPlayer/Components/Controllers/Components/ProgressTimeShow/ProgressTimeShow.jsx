import { useCallback, useEffect, useState } from 'react';
import useTimeFormat from '../../../../../../Hooks/useTimeFormate';
import { useVideoPlayerProgress } from '../../../../../../Hooks/useVideoPlayerProgress';
import styles from './ProgressTimeShow.module.css';

export default function ProgressTimeShow({ videoRef }) {
  const formatTime = useTimeFormat();

  const time = useVideoPlayerProgress();

  const [durationTime, setDurationTime] = useState(0);

  const loadUpdate = useCallback(({ target: { duration } }) => {
    setDurationTime(duration);
  }, []);

  useEffect(() => {
    videoRef.addEventListener('loadedmetadata', loadUpdate);

    return () => {
      videoRef.removeEventListener('loadedmetadata', loadUpdate);
    };
  }, [loadUpdate, videoRef]);

  return (
    <div className={styles.progressTimeShow}>
      <p>
        {time && durationTime
          ? formatTime((time / 100) * durationTime)
          : '0:00'}
        /{durationTime ? formatTime(durationTime) : '0:00'}
      </p>
    </div>
  );
}
