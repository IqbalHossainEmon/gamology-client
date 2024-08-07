import { useCallback, useEffect, useRef } from 'react';
import useDragStartStop from '../../../../../../Hooks/useDragStartStop';
import useScreenWidth from '../../../../../../Hooks/useScreenWidth';
import styles from './VideoSlider.module.css';

export default function VideoSlider({
    position,
    setPosition,
    isBuffer,
    buffer,
    videoContainer,
    changePause,
    handleMouseUp = () => {},
    handleMouseDown = () => {},
}) {
    const stateRef = useRef(position);
    stateRef.current = position;
    const pathRef = useRef(null);
    const screenWidth = useScreenWidth();

    const eventRef = useRef({
        handleResize: () => {},
    });

    eventRef.current.handleResize = useCallback(() => {
        pathRef.width = pathRef.current?.offsetWidth;
        pathRef.offsetLeft = pathRef.current.getBoundingClientRect().left;
    }, []);

    useEffect(() => {
        eventRef.current.handleResize();
    }, [screenWidth]);

    useEffect(() => {
        setTimeout(() => {
            eventRef.current.handleResize();
        }, 250);
    }, [changePause]);

    useEffect(() => {
        const { handleResize } = eventRef.current;

        const addFullscreenEventListeners = element => {
            element.addEventListener('fullscreenchange', handleResize);
            element.addEventListener('mozfullscreenchange', handleResize);
            element.addEventListener('MSFullscreenChange', handleResize);
            element.addEventListener('webkitfullscreenchange', handleResize);
        };

        const removeFullscreenEventListeners = element => {
            element.removeEventListener('fullscreenchange', handleResize);
            element.removeEventListener('mozfullscreenchange', handleResize);
            element.removeEventListener('MSFullscreenChange', handleResize);
            element.removeEventListener('webkitfullscreenchange', handleResize);
        };

        let videoContainerRef;

        if (videoContainer.current) {
            addFullscreenEventListeners(videoContainer.current);
            videoContainerRef = videoContainer.current;
        }

        return () => {
            if (videoContainerRef) {
                removeFullscreenEventListeners(videoContainerRef);
            }
        };
    }, [videoContainer]);

    const handleMoveEventRef = useRef(null);

    // get cursor position while dragging
    handleMoveEventRef.current = useCallback(
        e => {
            let cursorInPercent =
                ((e?.touches ? e.touches[0].clientX - pathRef.offsetLeft : e.clientX - pathRef.offsetLeft) /
                    pathRef.width) *
                100;

            if (cursorInPercent < 0) {
                cursorInPercent = 0;
            } else if (cursorInPercent > 100) {
                cursorInPercent = 100;
            }
            if (parseFloat(cursorInPercent.toFixed(3)) !== parseFloat(stateRef.current.toFixed(3))) {
                setPosition(cursorInPercent);
            }
        },
        [setPosition]
    );

    const handleMouseDownClick = useCallback(
        e => {
            handleMoveEventRef.current(e);
            handleMouseDown();
        },
        [handleMouseDown]
    );

    const onStart = useDragStartStop(handleMoveEventRef.current, handleMouseUp, handleMouseDownClick, false);

    return (
        <div
            ref={pathRef}
            tabIndex="0"
            role="button"
            onMouseDown={onStart}
            onTouchStart={onStart}
            className={styles.videoSliderPath}
        >
            <div className={styles.path} />
            <div style={{ scale: `${position / 100} 1` }} className={styles.activePath} />
            {isBuffer && <div style={{ scale: `${buffer / 100} 1` }} className={styles.bufferPath} />}
            <div style={{ translate: `${position}%` }} className={styles.knobContainer}>
                <div className={styles.knob} />
            </div>
        </div>
    );
}
