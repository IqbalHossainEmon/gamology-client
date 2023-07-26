import { memo, useRef } from 'react';
import withVideoPlayerProgress from '../../../../../HOC/withVideoPlayerProgress';
import FullScreenButton, {
  handleFullScreen,
} from '../Components/FullScreenButton/FullScreenButton';
import GearButton from '../Components/GearButton/GearButton/GearButton';
import PlayPauseButton from '../Components/PlayPauseButton/PlayPauseButton';
import ProgressTimeShow from '../Components/ProgressTimeShow/ProgressTimeShow';
import VideoProgressBar from '../Components/VideoProgressBar/VideoProgressBar';
import VideoStatus from '../Components/VideoStatus/VideoStatus';
import VideoVolume from '../Components/VideoVolume/VideoVolume';
import styles from './Controllers.module.css';

function Controllers({
  videoRef,
  src,
  videoContainerRef,
  isControllerShowing,
}) {
  const gearRef = useRef(null);
  const isSeekedRef = useRef(true);
  const clickTimerId = useRef(null);

  const togglePausePlay = () => {
    if (!videoRef.ended) {
      if (videoRef.paused) {
        videoRef.play();
      } else {
        videoRef.pause();
      }
    } else {
      videoRef.currentTime = 0;
      videoRef.play();
    }
  };

  // handle full screen or toggle play depending on click type
  const handleClick = () => {
    if (clickTimerId.current) {
      handleFullScreen(videoContainerRef);
      clearTimeout(clickTimerId.current);
      clickTimerId.current = null;
    } else {
      clickTimerId.current = setTimeout(() => {
        togglePausePlay();
        clearTimeout(clickTimerId.current);
        clickTimerId.current = null;
      }, 200);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className={styles.fullDisplayPlayPauseBtn}
      />
      <ul
        id={isControllerShowing ? styles.show : styles.hide}
        className={styles.controllers}
      >
        <li className={styles.videoProgressSlider}>
          <VideoProgressBar
            isSeekedRef={isSeekedRef}
            videoContainerRef={videoContainerRef}
            src={src}
            videoRef={videoRef}
          />
        </li>
        <li>
          <PlayPauseButton
            isSeekedRef={isSeekedRef}
            videoRef={videoRef}
            togglePausePlay={togglePausePlay}
          />
        </li>
        <li className={styles.volumeBtn}>
          <VideoVolume
            videoContainerRef={videoContainerRef}
            className={styles.sliderContainer}
            videoRef={videoRef}
          />
        </li>
        <li>
          <ProgressTimeShow videoRef={videoRef} />
        </li>
        <li ref={gearRef} className={styles.gearButton}>
          <GearButton videoContainerRef={videoContainerRef} gearRef={gearRef} />
        </li>
        <li>
          <FullScreenButton videoContainerRef={videoContainerRef} />
        </li>
      </ul>
      <VideoStatus isSeekedRef={isSeekedRef} videoRef={videoRef} />
    </>
  );
}

export default withVideoPlayerProgress(memo(Controllers));
