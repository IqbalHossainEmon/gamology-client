import { useCallback, useEffect, useRef, useState } from 'react';
import Controllers from '../Components/Controllers/Controllers/Controllers';
import Video from '../Components/Video/Video';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ src, captions, sizeClassName, changePause }) {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const mouseMoveTimerId = useRef(null);
  const onLoadedRef = useRef(false);
  const isChanging = useRef(false);

  const [isControllerShowing, setIsControllerShowing] = useState(false);

  // Show hide controllers by checking the time.
  const handleShowHide = useCallback(() => {
    if (onLoadedRef.current) {
      if (mouseMoveTimerId.current) {
        clearTimeout(mouseMoveTimerId.current);
        mouseMoveTimerId.current = null;
      } else {
        setIsControllerShowing(true);
      }
      mouseMoveTimerId.current = setTimeout(() => {
        mouseMoveTimerId.current = null;
        setIsControllerShowing(false);
      }, 5000);
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    handleShowHide();
  }, [handleShowHide]);

  useEffect(() => {
    if (!videoRef.current.paused) {
      videoRef.current.pause();
      isChanging.current = true;
    }
  }, [changePause]);

  const handleMouseUp = useCallback(() => {
    videoContainerRef?.current.addEventListener('mousemove', handleMouseMove);
    handleShowHide();
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove, handleShowHide]);

  const handleLoadedMetaData = useCallback(() => {
    onLoadedRef.current = true;
  }, []);

  const handleMouseDown = useCallback(() => {
    document.addEventListener('mouseup', handleMouseUp);
    if (mouseMoveTimerId.current) {
      clearTimeout(mouseMoveTimerId.current);
      mouseMoveTimerId.current = null;
    }
    videoContainerRef?.current.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    videoContainerRef?.current.addEventListener('mousemove', handleMouseMove);
    videoContainerRef?.current.addEventListener('mousedown', handleMouseDown);

    videoRef?.current.addEventListener('loadedmetadata', handleLoadedMetaData);

    const videoContainer = videoContainerRef.current;

    return () => {
      videoContainer.removeEventListener('mousemove', handleMouseMove);
      videoContainer.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleLoadedMetaData, handleMouseDown, handleMouseMove, handleMouseUp, videoContainerRef]);

  return (
    <div
      ref={videoContainerRef}
      className={
        sizeClassName ? [styles.videoContainer, sizeClassName].join(' ') : styles.videoContainer
      }
    >
      <Video
        videoContainer={videoContainerRef}
        ref={videoRef}
        className={styles.video}
        src={src}
        captions={captions}
      />

      <Controllers
        isControllerShowing={isControllerShowing}
        src={src}
        videoContainer={videoContainerRef}
        video={videoRef}
        isChanging={isChanging}
        changePause={changePause}
      />
    </div>
  );
}
