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

    const eventRef = useRef(null);

    eventRef.handleResize = useCallback(() => {
        pathRef.width = pathRef.current?.offsetWidth;
        pathRef.offsetLeft = pathRef.current.getBoundingClientRect().left;
    }, []);

    useEffect(() => {
        eventRef.handleResize();
    }, [screenWidth]);

    useEffect(() => {
        setTimeout(() => {
            eventRef.handleResize();
        }, 250);
    }, [changePause]);

    useEffect(() => {
        let videoContainerRef;

        if (videoContainer.current) {
            videoContainer.current.addEventListener('fullscreenchange', eventRef.handleResize);
            videoContainer.current.addEventListener('mozfullscreenchange', eventRef.handleResize);
            videoContainer.current.addEventListener('MSFullscreenChange', eventRef.handleResize);
            videoContainer.current.addEventListener('webkitfullscreenchange', eventRef.handleResize);

            videoContainerRef = videoContainer.current;
        }

        return () => {
            videoContainerRef.removeEventListener('fullscreenchange', eventRef.handleResize);
            videoContainerRef.removeEventListener('mozfullscreenchange', eventRef.handleResize);
            videoContainerRef.removeEventListener('MSFullscreenChange', eventRef.handleResize);
            videoContainerRef.removeEventListener('webkitfullscreenchange', eventRef.handleResize);
        };
    }, [videoContainer]);

    const handleMouseEvent = useRef(null);

    // get cursor position while dragging
    handleMouseEvent.current = useCallback(
        e => {
            let cursorInPercent =
                ((e?.touches ? e.touches[0].clientX - pathRef.offsetLeft : e.clientX - pathRef.offsetLeft) / pathRef.width) * 100;

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
            handleMouseEvent.current(e);
            handleMouseDown();
        },
        [handleMouseDown]
    );

    const onStart = useDragStartStop(handleMouseEvent, handleMouseUp, handleMouseDownClick, false);

    return (
        <div ref={pathRef} tabIndex="0" role="button" onMouseDown={onStart} onTouchStart={onStart} className={styles.videoSliderPath}>
            <div className={styles.path} />
            <div style={{ scale: `${position / 100} 1` }} className={styles.activePath} />
            {isBuffer && <div style={{ scale: `${buffer / 100} 1` }} className={styles.bufferPath} />}
            <div style={{ translate: `${position}%` }} className={styles.knobContainer}>
                <div className={styles.knob} />
            </div>
        </div>
    );
}
