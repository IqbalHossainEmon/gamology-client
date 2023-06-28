import { useCallback, useState } from 'react';
import VideoSlider from '../VideoSlider/VideoSlider';

import VolumeButton from '../VolumeButton/VolumeButton';
import styles from './VideoVolume.module.css';

export default function VideoVolume({ videoRef, className, isFullScreen }) {
  const [volume, setVolume] = useState({
    progress: 0,
  });

  const handleSetValue = useCallback(
    (val) => {
      if (val > 0) {
        videoRef.muted = false;
      } else {
        videoRef.muted = true;
      }

      videoRef.volume = val / 100;
    },
    [videoRef],
  );

  return (
    <>
      <VolumeButton
        setVolume={setVolume}
        volume={volume.progress}
        videoRef={videoRef}
      />
      <div className={[styles.volumeSliderContainer, className].join(' ')}>
        <div className={styles.volumeSlider}>
          <VideoSlider
            isFullScreen={isFullScreen}
            setPosition={setVolume}
            position={volume}
            setValue={handleSetValue}
          />
        </div>
      </div>
    </>
  );
}
