import { useCallback, useEffect } from 'react';
import useTimeFormat from '../../../../../../Hooks/useTimeFormate';
import styles from './ProgressTimeShow.module.css';

export default function ProgressTimeShow({ videoRef, time, setProgression }) {
  const formatTime = useTimeFormat();

  const loadUpdate = useCallback(
    ({ target: { duration } }) => {
      setProgression((prev) => ({
        ...prev,
        durationTime: duration,
      }));
    },
    [setProgression],
  );

  useEffect(() => {
    videoRef.addEventListener('loadedmetadata', loadUpdate);

    return () => {
      videoRef.removeEventListener('loadedmetadata', loadUpdate);
    };
  }, [loadUpdate, videoRef]);

  return (
    <div className={styles.progressTimeShow}>
      <p>
        {time.progressTime ? formatTime(time.progressTime) : '0:00'} /
        {time.durationTime ? formatTime(time.durationTime) : '0:00'}
      </p>
    </div>
  );
}
