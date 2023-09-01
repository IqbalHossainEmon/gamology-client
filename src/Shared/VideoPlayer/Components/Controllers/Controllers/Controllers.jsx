import { memo, useCallback, useEffect, useRef } from 'react';
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
  video,
  videoContainer,
  src,
  isControllerShowing,
  isChanging,
  changePause,
}) {
  const gearRef = useRef(null);
  const clickTimerId = useRef(null);
  const videoRef = useRef(video);

  const isSeekedRef = useRef(true);
  const canPlay = useRef(true);
  const shouldPause = useRef(false);

  const togglePausePlay = () => {
    if (canPlay.current) {
      if (!videoRef.current.ended) {
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      } else {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    } else {
      shouldPause.current = true;
    }
  };

  // handle full screen or toggle play depending on click type
  const handleClick = () => {
    if (clickTimerId.current) {
      handleFullScreen(videoContainer.current);
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

  const handlePlaying = useCallback(() => {
    canPlay.current = true;
    if (shouldPause.current) {
      videoRef.current.pause();
      shouldPause.current = false;
    }
  }, []);

  const handleCanPlayPlayThorough = useCallback(() => {}, []);

  const handleWaiting = useCallback(() => {
    canPlay.current = false;
  }, []);

  useEffect(() => {
    if (video.current) {
      videoRef.current = video.current;
      videoRef.current.addEventListener('playing', handlePlaying);
      videoRef.current.addEventListener(
        'canplaythrough',
        handleCanPlayPlayThorough,
      );
      videoRef.current.addEventListener('waiting', handleWaiting);
    }
    return () => {
      videoRef.current.removeEventListener('playing', handlePlaying);
      videoRef.current.removeEventListener('waiting', handleWaiting);
    };
  }, [handleCanPlayPlayThorough, handlePlaying, handleWaiting, video]);

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
            changePause={changePause}
            isSeekedRef={isSeekedRef}
            video={video}
            videoContainer={videoContainer}
            src={src}
          />
        </li>
        <li>
          <PlayPauseButton
            canPlay={canPlay}
            isSeekedRef={isSeekedRef}
            video={video}
            togglePausePlay={togglePausePlay}
          />
        </li>
        <li>
          <VideoVolume
            changePause={changePause}
            video={video}
            videoContainer={videoContainer}
          />
        </li>
        <li>
          <ProgressTimeShow video={video} />
        </li>
        <li ref={gearRef} className={styles.gearButton}>
          <GearButton videoContainer={videoContainer} gearRef={gearRef} />
        </li>
        <li>
          <FullScreenButton videoContainer={videoContainer} />
        </li>
      </ul>
      <VideoStatus
        isChanging={isChanging}
        isSeekedRef={isSeekedRef}
        video={video}
      />
    </>
  );
}

export default withVideoPlayerProgress(memo(Controllers));
