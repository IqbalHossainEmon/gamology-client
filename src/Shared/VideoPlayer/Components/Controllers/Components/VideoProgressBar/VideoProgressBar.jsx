import { useCallback, useEffect, useRef } from 'react';
import VideoSlider from '../VideoSlider/VideoSlider';

export default function VideoProgressBar({
  videoRef,
  src,
  isFullScreen,
  progression,
  setProgression,
  progressUpdate,
  progressBufferUpdate,
}) {
  const interval = useRef(null);

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

  const handleSetProgression = useCallback(
    (val) => {
      setProgression((prev) => ({
        ...prev,
        progress: val,
        progressTime: (val / 100) * videoRef.duration,
      }));
      videoRef.currentTime = (val / 100) * videoRef.duration;
    },
    [setProgression, videoRef],
  );

  return (
    <VideoSlider
      isFullScreen={isFullScreen}
      isBuffer
      position={progression.progress}
      buffer={progression.buffer}
      setPosition={handleSetProgression}
    />
  );
}
