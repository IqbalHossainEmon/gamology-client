import { useCallback, useEffect, useRef, useState } from 'react';
import Controllers from '../Components/Controllers/Controllers/Controllers';
import Video from '../Components/Video/Video';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ src, captions, sizeClassName, changePause }) {
    const videoRef = useRef(null),
     videoContainerRef = useRef(null),
     mouseMoveTimerId = useRef(null),
     onLoadedRef = useRef(false),
     isChanging = useRef(false),
     eventRef = useRef({
        handleMouseMove: () => {},
        handleLoadedMetaData: () => {},
        handleMouseDown: () => {},
    }),

     [isControllerShowing, setIsControllerShowing] = useState(false),

    // Show hide controllers by checking the time.
     handleShowHide = useCallback(() => {
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

    eventRef.current.handleMouseMove = useCallback(() => {
        handleShowHide();
    }, [handleShowHide]);

    useEffect(() => {
        if (!videoRef.current.paused) {
            videoRef.current.pause();
            isChanging.current = true;
        }
    }, [changePause]);

    const handleMouseUp = useCallback(() => {
        videoContainerRef?.current.addEventListener('mousemove', eventRef.current.handleMouseMove);
        handleShowHide();
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleShowHide]);

    eventRef.current.handleLoadedMetaData = useCallback(() => {
        onLoadedRef.current = true;
    }, []);

    eventRef.current.handleMouseDown = useCallback(() => {
        document.addEventListener('mouseup', handleMouseUp);
        if (mouseMoveTimerId.current) {
            clearTimeout(mouseMoveTimerId.current);
            mouseMoveTimerId.current = null;
        }
        videoContainerRef?.current.removeEventListener('mousemove', eventRef.current.handleMouseMove);
    }, [handleMouseUp]);

    useEffect(() => {
        const { handleMouseMove, handleMouseDown, handleLoadedMetaData } = eventRef.current,

         addEventListeners = (videoContainer, video) => {
            if (videoContainer) {
                videoContainer.addEventListener('mousemove', handleMouseMove);
                videoContainer.addEventListener('mousedown', handleMouseDown);
            }
            if (video) {
                video.addEventListener('loadedmetadata', handleLoadedMetaData);
            }
        },

         removeEventListeners = (videoContainer, video) => {
            if (video) {
                video.removeEventListener('loadedmetadata', handleLoadedMetaData);
            }
            if (videoContainer) {
                videoContainer.removeEventListener('mousemove', handleMouseMove);
                videoContainer.removeEventListener('mousedown', handleMouseDown);
            }
        },

         videoContainer = videoContainerRef.current,
         video = videoRef.current;

        addEventListeners(videoContainer, video);

        return () => {
            removeEventListeners(videoContainer, video);
        };
    }, [handleMouseUp, videoContainerRef]);

    return (
        <div
            className={sizeClassName ? [styles.videoContainer, sizeClassName].join(' ') : styles.videoContainer}
            ref={videoContainerRef}
        >
            <Video
                captions={captions}
                className={styles.video}
                ref={videoRef}
                src={src}
                videoContainer={videoContainerRef}
            />

            <Controllers
                changePause={changePause}
                isChanging={isChanging}
                isControllerShowing={isControllerShowing}
                src={src}
                video={videoRef}
                videoContainer={videoContainerRef}
            />
        </div>
    );
}
