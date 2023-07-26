import { useCallback, useEffect, useState } from 'react';
import styles from './FullScreenButton.module.css';

export const handleFullScreen = (ref) => {
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    return;
  }
  if (ref.requestFullscreen) {
    ref.requestFullscreen();
  } else if (ref.webkitRequestFullscreen) {
    ref.webkitRequestFullscreen();
  } else if (ref.mozRequestFullScreen) {
    ref.mozRequestFullScreen();
  } else if (ref.msRequestFullscreen) {
    ref.msRequestFullscreen();
  }
};

export default function FullScreenButton({ videoContainerRef }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullscreenChange = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, [setIsFullScreen]);

  useEffect(() => {
    videoContainerRef.addEventListener(
      'fullscreenchange',
      handleFullscreenChange,
    );
    videoContainerRef.addEventListener(
      'mozfullscreenchange',
      handleFullscreenChange,
    );
    videoContainerRef.addEventListener(
      'MSFullscreenChange',
      handleFullscreenChange,
    );
    videoContainerRef.addEventListener(
      'webkitfullscreenchange',
      handleFullscreenChange,
    );
    return () => {
      videoContainerRef.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange,
      );
      videoContainerRef.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      videoContainerRef.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange,
      );
      videoContainerRef.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
    };
  }, [handleFullscreenChange, videoContainerRef]);

  return (
    <button
      type="button"
      onClick={() => handleFullScreen(videoContainerRef)}
      className={styles.fullScreenButton}
    >
      <span>
        <svg viewBox="0 0 14 14">
          <title>{isFullScreen ? 'Enter fullscreen' : 'Exit fullscreen'}</title>
          <g fill="none" fillRule="evenodd">
            <path d="M-5-5h24v24H-5z" />
            <path
              d={
                isFullScreen
                  ? 'M0 11h3v3h2V9H0v2zm3-8H0v2h5V0H3v3zm6 11h2v-3h3V9H9v5zm2-11V0H9v5h5V3h-3z'
                  : 'M2 9H0v5h5v-2H2V9zM0 5h2V2h3V0H0v5zm12 7H9v2h5V9h-2v3zM9 0v2h3v3h2V0H9z'
              }
              fill="white"
              fillRule="nonzero"
            />
          </g>
        </svg>
      </span>
    </button>
  );
}
