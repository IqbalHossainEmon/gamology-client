import { useCallback, useEffect, useRef, useState } from 'react';
import Controllers from '../Components/Controllers/Controllers/Controllers';
import Video from '../Components/Video/Video';
import VideoStatus from '../Components/VideoStatus/VideoStatus';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ src, captions, sizeClassName }) {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const timerId = useRef(null);
  const [status, setStatus] = useState({ initial: false });

  const [isControllerShowing, setIsControllerShowing] = useState(false);
  const [autoplay, setAutoplay] = useState();

  const handleMouseMove = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    } else {
      setIsControllerShowing(true);
    }
    timerId.current = setTimeout(() => {
      clearTimeout(timerId.current);
      timerId.current = null;
      setIsControllerShowing(false);
    }, 5000);
  }, []);

  useEffect(() => {
    videoContainerRef?.current.addEventListener('mousemove', handleMouseMove);
    const videoContainer = videoContainerRef.current;

    if (localStorage.getItem('autoplay')) {
      setAutoplay(true);
    }

    return () => {
      videoContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove, videoContainerRef]);

  return (
    <div
      ref={videoContainerRef}
      className={
        sizeClassName
          ? [styles.videoContainer, sizeClassName].join(' ')
          : styles.videoContainer
      }
    >
      <Video
        videoContainerRef={videoContainerRef.current}
        ref={videoRef}
        className={styles.video}
        src={src}
        captions={captions}
      />

      {videoRef.current !== null && videoContainerRef.current !== null && (
        <Controllers
          setStatus={setStatus}
          isControllerShowing={isControllerShowing}
          src={src}
          autoplay={autoplay}
          setAutoplay={setAutoplay}
          videoRef={videoRef.current}
          videoContainerRef={videoContainerRef.current}
        />
      )}
      {videoRef.current !== null && (
        <VideoStatus
          status={status}
          autoplay={autoplay}
          videoRef={videoRef.current}
        />
      )}
    </div>
  );
}
