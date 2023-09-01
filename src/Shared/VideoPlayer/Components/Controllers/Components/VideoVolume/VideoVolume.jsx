import { useCallback, useEffect, useRef, useState } from 'react';
import VideoSlider from '../VideoSlider/VideoSlider';

import VolumeButton from '../VolumeButton/VolumeButton';
import styles from './VideoVolume.module.css';

export default function VideoVolume({ video, videoContainer, changePause }) {
  const [volume, setVolume] = useState(0);

  const videoRef = useRef(video.current);

  useEffect(() => {
    if (video.current) {
      videoRef.current = video.current;
    }
  }, [video]);

  const handleSetValue = useCallback((val) => {
    setVolume(val);
    if (val > 0) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }

    videoRef.current.volume = val / 100;
  }, []);

  return (
    <div className={styles.volume}>
      <VolumeButton setVolume={setVolume} volume={volume} videoRef={videoRef} />
      <div className={styles.volumeSliderContainer}>
        <div className={styles.volumeSlider}>
          <VideoSlider
            videoContainer={videoContainer}
            setPosition={handleSetValue}
            position={volume}
            changePause={changePause}
          />
        </div>
      </div>
    </div>
  );
}
