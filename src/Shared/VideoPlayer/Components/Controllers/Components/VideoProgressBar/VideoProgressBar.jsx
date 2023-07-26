import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useVideoPlayerProgress,
  useVideoPlayerSetProgress,
} from '../../../../../../Hooks/useVideoPlayerProgress';
import VideoSlider from '../VideoSlider/VideoSlider';

export default function VideoProgressBar({
  videoRef,
  src,
  videoContainerRef,

  isSeekedRef,
}) {
  const interval = useRef(null);
  const wasPlaying = useRef(false);
  const seekingInterval = useRef(null);
  const [buffer, setBuffer] = useState(0);

  const progress = useVideoPlayerProgress();
  const setProgress = useVideoPlayerSetProgress();

  const progressRef = useRef(progress);
  progressRef.current = progress;

  const progressBufferUpdate = useCallback(
    ({ target: { buffered, duration } }) => {
      if (buffered.length > 0) {
        setBuffer((buffered.end(0) / duration) * 100);
      }
    },
    [],
  );

  const progressUpdate = useCallback(
    ({ target: { duration, currentTime } }) => {
      setProgress((currentTime / duration) * 100);
    },
    [setProgress],
  );

  const handleError = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, []);

  useEffect(() => {
    videoRef.addEventListener('timeupdate', progressUpdate);
    videoRef.addEventListener('progress', progressBufferUpdate);
    videoRef.addEventListener('error', handleError);

    if (!interval.current) {
      interval.count = 0;
      interval.current = setInterval(() => {
        if (videoRef.buffered.length === 0) {
          videoRef.load(src);
        } else {
          progressBufferUpdate({ target: videoRef });
          clearInterval(interval.current);
          interval.current = null;
        }

        if (interval.count > 120) {
          clearInterval(interval.current);
          interval.current = null;
        }
        interval.count++;
      }, 500);
    }

    return () => {
      videoRef.removeEventListener('timeupdate', progressUpdate);
      videoRef.removeEventListener('progress', progressBufferUpdate);
      videoRef.removeEventListener('error', handleError);
    };
  }, [handleError, progressBufferUpdate, progressUpdate, src, videoRef]);

  // set current time but after 100ms of mouse move else clear the timer
  const setCurrentTime = useCallback(() => {
    if (seekingInterval.current) {
      clearTimeout(seekingInterval.current);
      seekingInterval.current = null;
    }
    seekingInterval.current = setTimeout(() => {
      if (wasPlaying.current) {
        videoRef.play();
        wasPlaying.current = false;
      }
      videoRef.currentTime = (progressRef.current / 100) * videoRef.duration;
      clearTimeout(seekingInterval.current);
      seekingInterval.current = null;
    }, 100);
  }, [videoRef]);

  const handleOnclickCurrentTime = useCallback(
    (val) => {
      videoRef.currentTime = (val / 100) * videoRef.duration;
    },
    [videoRef],
  );

  const handleSetProgression = useCallback(
    (val) => {
      if (!videoRef.paused) {
        videoRef.pause();
        wasPlaying.current = true;
        isSeekedRef.current = false;
      }
      setProgress(val);
      setCurrentTime();
    },
    [isSeekedRef, setCurrentTime, setProgress, videoRef],
  );

  return (
    <VideoSlider
      videoContainerRef={videoContainerRef}
      isBuffer
      position={progress}
      buffer={buffer}
      setPosition={handleSetProgression}
      handleSingleClick={handleOnclickCurrentTime}
    />
  );
}
