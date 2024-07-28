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
    const eventRef = useRef({
        handleMouseMove: () => {},
        handleLoadedMetaData: () => {},
        handleMouseDown: () => {},
    });

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
        const { handleMouseMove, handleMouseDown, handleLoadedMetaData } = eventRef.current;

        const addEventListeners = (videoContainer, video) => {
            if (videoContainer) {
                videoContainer.addEventListener('mousemove', handleMouseMove);
                videoContainer.addEventListener('mousedown', handleMouseDown);
            }
            if (video) {
                video.addEventListener('loadedmetadata', handleLoadedMetaData);
            }
        };

        const removeEventListeners = (videoContainer, video) => {
            if (video) {
                video.removeEventListener('loadedmetadata', handleLoadedMetaData);
            }
            if (videoContainer) {
                videoContainer.removeEventListener('mousemove', handleMouseMove);
                videoContainer.removeEventListener('mousedown', handleMouseDown);
            }
        };

        const videoContainer = videoContainerRef.current;
        const video = videoRef.current;

        addEventListeners(videoContainer, video);

        return () => {
            removeEventListeners(videoContainer, video);
        };
    }, [handleMouseUp, videoContainerRef]);

    return (
        <div
            ref={videoContainerRef}
            className={sizeClassName ? [styles.videoContainer, sizeClassName].join(' ') : styles.videoContainer}
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
