import { forwardRef, useCallback, useEffect, useState } from 'react';
import styles from './Video.module.css';

function Video({ videoContainerRef, src, captions, className }, ref) {
  const [fullscreenSize, setFullscreenSize] = useState({
    isFullScreen: false,
    width: 0,
    height: 0,
  });

  const handleSetFullscreenSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (height > width / 1.7777778) {
      setFullscreenSize({
        isFullScreen: true,
        width,
        height: width / 1.7777778,
      });
    } else {
      setFullscreenSize({
        isFullScreen: true,
        width: height * 1.7777778,
        height,
      });
    }
  };

  const handleFullscreenChange = useCallback(() => {
    if (document.fullscreenElement) {
      handleSetFullscreenSize();
      window.addEventListener('resize', handleSetFullscreenSize);
    } else {
      setFullscreenSize((prev) => ({ ...prev, isFullScreen: false }));
      window.removeEventListener('resize', handleSetFullscreenSize);
    }
  }, []);

  useEffect(() => {
    videoContainerRef?.addEventListener(
      'fullscreenchange',
      handleFullscreenChange,
    );
    videoContainerRef?.addEventListener(
      'mozfullscreenchange',
      handleFullscreenChange,
    );
    videoContainerRef?.addEventListener(
      'MSFullscreenChange',
      handleFullscreenChange,
    );
    videoContainerRef?.addEventListener(
      'webkitfullscreenchange',
      handleFullscreenChange,
    );

    return () => {
      videoContainerRef?.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange,
      );
      videoContainerRef?.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      videoContainerRef?.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange,
      );
      videoContainerRef?.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
    };
  }, [handleFullscreenChange, videoContainerRef]);

  return (
    <video
      crossOrigin="anonymous"
      ref={ref}
      preload="auto"
      className={[className, styles.video].join(' ')}
      src={src}
      muted
      {...(fullscreenSize.isFullScreen && {
        style: {
          width: `${fullscreenSize.width}px`,
          height: `${fullscreenSize.height}px`,
        },
      })}
    >
      <track kind="captions" src={captions} />
      <p>Your browser does not support the video tag.</p>
    </video>
  );
}

export default forwardRef(Video);
