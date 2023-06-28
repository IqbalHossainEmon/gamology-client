import { useCallback, useEffect, useState } from 'react';
import useTimeFormat from '../../../../../../Hooks/useTimeFormate';
import styles from './ProgressTimeShow.module.css';

export default function ProgressTimeShow({ videoRef }) {
  const [time, setTime] = useState({ progress: 0, duration: 0 });

  const formatTime = useTimeFormat();

  const progressTimeUpdate = useCallback(
    ({ target: { duration, currentTime } }) => {
      setTime((prev) => {
        if (prev.duration === 0) {
          return { progress: currentTime, duration };
        }
        return {
          ...prev,
          progress: currentTime,
        };
      });
    },
    [],
  );

  const loadUpdate = useCallback(
    (e) => {
      progressTimeUpdate(e);
    },
    [progressTimeUpdate],
  );

  useEffect(() => {
    videoRef.addEventListener('timeupdate', progressTimeUpdate);
    videoRef.addEventListener('loadedmetadata', loadUpdate);

    return () => {
      videoRef.removeEventListener('timeupdate', progressTimeUpdate);
      videoRef.removeEventListener('loadedmetadata', loadUpdate);
    };
  }, [loadUpdate, progressTimeUpdate, videoRef]);

  return (
    <div className={styles.progressTimeShow}>
      <p>
        {time.progress ? formatTime(time.progress) : '0:00'} /
        {time.progress ? formatTime(time.duration) : '0:00'}
      </p>
    </div>
  );
}
