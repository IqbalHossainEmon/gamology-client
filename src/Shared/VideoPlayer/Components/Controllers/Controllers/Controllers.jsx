import { useCallback, useRef, useState } from 'react';
import FullScreenButton, {
  handleFullScreen,
} from '../Components/FullScreenButton/FullScreenButton';
import GearButton from '../Components/GearButton/GearButton/GearButton';
import PlayPauseButton from '../Components/PlayPauseButton/PlayPauseButton';
import ProgressTimeShow from '../Components/ProgressTimeShow/ProgressTimeShow';
import VideoProgressBar from '../Components/VideoProgressBar/VideoProgressBar';
import VideoVolume from '../Components/VideoVolume/VideoVolume';
import styles from './Controllers.module.css';

export default function Controllers({
  videoRef,
  src,
  videoContainerRef,
  autoplay,
  setAutoplay,
  isControllerShowing,
  setStatus,
}) {
  const gearRef = useRef(null);
  const timerId = useRef(null);
  const clickTimerId = useRef(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [progression, setProgression] = useState({
    progress: 0,
    buffer: 0,
    progressTime: 0,
    durationTime: 0,
  });

  const progressUpdate = useCallback(
    ({ target: { duration, currentTime } }) => {
      setProgression((prev) => ({
        ...prev,
        progress: (currentTime / duration) * 100,
        progressTime: currentTime,
      }));
    },
    [setProgression],
  );

  const progressBufferUpdate = useCallback(
    ({ target: { buffered, duration } }) => {
      if (buffered.length > 0) {
        setProgression((prev) => ({
          ...prev,
          buffer: (buffered.end(0) / duration) * 100,
        }));
      }
    },
    [setProgression],
  );

  const togglePausePlay = () => {
    if (!videoRef.ended) {
      setStatus((prev) => {
        if (prev.play) {
          videoRef.pause();
          if (prev.animation) {
            return { ...prev, play: false };
          }
          return { play: false, animation: true };
        }
        videoRef.play();
        if (prev.animation) {
          return { ...prev, play: true };
        }
        return { play: true, animation: true };
      });

      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      timerId.current = setTimeout(() => {
        clearTimeout(timerId);
        timerId.current = null;
        setStatus((prev) => ({ ...prev, animation: false }));
      }, 500);
    } else {
      videoRef.currentTime = 0;
      videoRef.play();
    }
  };

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
            progressUpdate={progressUpdate}
            progressBufferUpdate={progressBufferUpdate}
            progression={progression}
            setProgression={setProgression}
            isFullScreen={isFullScreen}
            src={src}
            videoRef={videoRef}
          />
        </li>
        <li>
          <PlayPauseButton
            videoRef={videoRef}
            togglePausePlay={togglePausePlay}
          />
        </li>
        <li className={styles.volumeBtn}>
          <VideoVolume
            isFullScreen={isFullScreen}
            className={styles.sliderContainer}
            videoRef={videoRef}
          />
        </li>
        <li>
          <ProgressTimeShow
            setProgression={setProgression}
            time={progression}
            videoRef={videoRef}
          />
        </li>
        <li ref={gearRef} className={styles.gearButton}>
          <GearButton
            isFullScreen={isFullScreen}
            gearRef={gearRef}
            autoplay={autoplay}
            setAutoplay={setAutoplay}
          />
        </li>
        <li>
          <FullScreenButton
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            videoContainerRef={videoContainerRef}
          />
        </li>
      </ul>
    </>
  );
}
