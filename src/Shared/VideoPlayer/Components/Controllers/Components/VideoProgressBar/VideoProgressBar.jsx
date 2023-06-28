import { useCallback, useEffect, useRef, useState } from 'react';
import VideoSlider from '../VideoSlider/VideoSlider';

export default function VideoProgressBar({ videoRef, src, isFullScreen }) {
  const [progression, setProgression] = useState({ progress: 0, buffer: 0 });

  const interval = useRef(null);

  const progressUpdate = useCallback(
    ({ target: { duration, currentTime } }) => {
      setProgression((prev) => ({
        ...prev,
        progress: (currentTime / duration) * 100,
      }));
    },
    [],
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
    [],
  );

  const handleSliderValue = useCallback(
    (val) => {
      videoRef.currentTime = (val / 100) * videoRef.duration;
    },
    [videoRef],
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
        interval.count = +1;
      }, 500);
    }

    return () => {
      videoRef.removeEventListener('timeupdate', progressUpdate);
      videoRef.removeEventListener('progress', progressBufferUpdate);
      videoRef.removeEventListener('error', handleError);
    };
  }, [handleError, progressBufferUpdate, progressUpdate, src, videoRef]);

  return (
    <VideoSlider
      isFullScreen={isFullScreen}
      buffer
      position={progression}
      setPosition={setProgression}
      setValue={handleSliderValue}
    />
  );
}
