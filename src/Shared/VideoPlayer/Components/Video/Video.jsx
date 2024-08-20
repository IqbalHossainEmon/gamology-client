import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Video.module.css';

function Video({ videoContainer, src, captions, className }, ref) {
    const [fullscreenSize, setFullscreenSize] = useState({
        isFullScreen: false,
        width: 0,
        height: 0,
    }),

     eventRef = useRef({
        handleSetFullscreenSize: () => {},
        handleFullscreenChange: () => {},
    });

    eventRef.current.handleSetFullscreenSize = useCallback(() => {
        const width = window.innerWidth,
         height = window.innerHeight;

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

    eventRef.current.handleFullscreenChange = useCallback(() => {
        if (document.fullscreenElement) {
            eventRef.current.handleSetFullscreenSize();
            window.addEventListener('resize', eventRef.current.handleSetFullscreenSize);
        } else {
            setFullscreenSize(prev => ({ ...prev, isFullScreen: false }));
            window.removeEventListener('resize', eventRef.current.handleSetFullscreenSize);
        }
    }, []);

    useEffect(() => {
        const { handleFullscreenChange } = eventRef.current,

         addFullscreenEventListeners = element => {
            element.addEventListener('fullscreenchange', handleFullscreenChange);
            element.addEventListener('mozfullscreenchange', handleFullscreenChange);
            element.addEventListener('MSFullscreenChange', handleFullscreenChange);
            element.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        },

         removeFullscreenEventListeners = element => {
            element.removeEventListener('fullscreenchange', handleFullscreenChange);
            element.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            element.removeEventListener('MSFullscreenChange', handleFullscreenChange);
            element.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };

        let videoContainerRef;

        if (videoContainer.current) {
            videoContainerRef = videoContainer.current;
            addFullscreenEventListeners(videoContainerRef);
        }

        return () => {
            if (videoContainerRef) {
                removeFullscreenEventListeners(videoContainerRef);
            }
        };
    }, [videoContainer]);

    return (
        <video
            className={[className, styles.video].join(' ')}
            crossOrigin="anonymous"
            muted
            preload="auto"
            ref={ref}
            src={src}
            {...(fullscreenSize.isFullScreen && {
                style: {
                    width: `${fullscreenSize.width}px`,
                    height: `${fullscreenSize.height}px`,
                },
            })}
        >
            <track
                kind="captions"
                src={captions}
            />

            <p>
                Your browser does not support the video tag.
            </p>
        </video>
    );
}

export default forwardRef(Video);
