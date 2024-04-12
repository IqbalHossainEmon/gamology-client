import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Video.module.css';

function Video({ videoContainer, src, captions, className }, ref) {
    const [fullscreenSize, setFullscreenSize] = useState({
        isFullScreen: false,
        width: 0,
        height: 0,
    });

    const eventRef = useRef(null);

    eventRef.handleSetFullscreenSize = useCallback(() => {
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
    }, []);

    eventRef.handleFullscreenChange = useCallback(() => {
        if (document.fullscreenElement) {
            eventRef.handleSetFullscreenSize();
            window.addEventListener('resize', eventRef.handleSetFullscreenSize);
        } else {
            setFullscreenSize(prev => ({ ...prev, isFullScreen: false }));
            window.removeEventListener('resize', eventRef.handleSetFullscreenSize);
        }
    }, []);

    useEffect(() => {
        let videoContainerRef;
        if (videoContainer.current) {
            videoContainerRef = videoContainer.current;

            videoContainerRef.addEventListener('fullscreenchange', eventRef.handleFullscreenChange);
            videoContainerRef.addEventListener('mozfullscreenchange', eventRef.handleFullscreenChange);
            videoContainerRef.addEventListener('MSFullscreenChange', eventRef.handleFullscreenChange);
            videoContainerRef.addEventListener('webkitfullscreenchange', eventRef.handleFullscreenChange);
        }

        return () => {
            if (videoContainerRef) {
                videoContainerRef.removeEventListener('fullscreenchange', eventRef.handleFullscreenChange);
                videoContainerRef.removeEventListener('mozfullscreenchange', eventRef.handleFullscreenChange);
                videoContainerRef.removeEventListener('MSFullscreenChange', eventRef.handleFullscreenChange);
                videoContainerRef.removeEventListener('webkitfullscreenchange', eventRef.handleFullscreenChange);
            }
        };
    }, [videoContainer]);

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
