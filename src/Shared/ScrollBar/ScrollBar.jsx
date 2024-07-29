import { useCallback, useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../Hooks/useDragStartStop';
import styles from './ScrollBar.module.css';

const ScrollBar = ({ parentRef, childRef }) => {
    const [scrolled, setScrolled] = useState(0);
    const [show, setShow] = useState(false);
    const [height, setHeight] = useState(0);

    const thumbRef = useRef(null);
    const downElement = useRef(null);
    const containerRef = useRef(null);
    const timerID = useRef(null);
    const handleMoveEventRef = useRef(() => {});

    handleMoveEventRef.current = useCallback(
        (e, isClick) => {
            const cursorInEle = e?.touches
                ? e.touches[0].clientY - thumbRef.current.getBoundingClientRect().y
                : e.clientY - thumbRef.current.getBoundingClientRect().y;

            if (!downElement.current && !isClick) {
                downElement.current = cursorInEle;
            } else if (isClick) {
                downElement.current = thumbRef.current.clientHeight / 2;
            }

            setScrolled(prev => {
                if (prev + cursorInEle - downElement.current < 0) {
                    parentRef.current.scrollTop = 0;
                    return 0;
                }
                if (
                    prev + cursorInEle - downElement.current >
                    parentRef.current.clientHeight - thumbRef.current.clientHeight
                ) {
                    parentRef.current.scrollTop = parentRef.current.scrollHeight - parentRef.current.clientHeight;
                    return parentRef.current.clientHeight - thumbRef.current.clientHeight;
                }

                parentRef.current.scrollTop =
                    ((prev + cursorInEle - downElement.current) /
                        (parentRef.current.clientHeight - thumbRef.current.clientHeight)) *
                    (parentRef.current.scrollHeight - parentRef.current.clientHeight);
                return prev + cursorInEle - downElement.current;
            });
        },
        [parentRef]
    );

    const handleMouseUp = useCallback(() => {
        downElement.current = null;
    }, []);

    const onStart = useDragStartStop(handleMoveEventRef.current, handleMouseUp);

    const handleScrollHide = () => {
        if (timerID.current) {
            clearTimeout(timerID.current);
            timerID.current = null;
        }
        timerID.current = setTimeout(() => {
            timerID.current = null;
            setShow(false);
        }, 2000);
    };

    const handleSetHeight = useRef(null);

    handleSetHeight.current = useCallback(() => {
        setHeight(() => {
            const heightCheck = (parentRef.current.clientHeight / parentRef.current.scrollHeight) * 100;

            if (heightCheck > 100) {
                return 100;
            }
            return heightCheck;
        });
    }, [parentRef]);

    const eventRef = useRef({
        handleScroll: () => {},
        handleMouseMove: () => {},
    });

    eventRef.current.handleScroll = useCallback(() => {
        setShow(true);
        handleScrollHide();
        setScrolled(
            (parentRef.current.scrollTop / (parentRef.current.scrollHeight - parentRef.current.clientHeight)) *
                (parentRef.current.clientHeight - thumbRef.current.clientHeight)
        );
    }, [parentRef]);

    eventRef.current.handleMouseMove = useCallback(() => {
        setShow(true);
        handleScrollHide();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleSetHeight.current);

        return () => {
            window.removeEventListener('resize', handleSetHeight.current);
        };
    }, [childRef]);

    useEffect(() => {
        const childObserve = new ResizeObserver(handleSetHeight.current);
        childObserve.observe(childRef.current);
        const parentObserve = new ResizeObserver(handleSetHeight.current);
        parentObserve.observe(parentRef.current);

        const parent = parentRef.current;
        const container = containerRef.current;

        const { handleScroll } = eventRef.current;
        const { handleMouseMove } = eventRef.current;

        parent.addEventListener('scroll', handleScroll);
        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            childObserve.disconnect();
            parentObserve.disconnect();

            parent.removeEventListener('scroll', handleScroll);
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, [childRef, parentRef]);

    return (
        <div
            tabIndex={0}
            role="button"
            ref={containerRef}
            onClick={e => handleMoveEventRef.current(e, true)}
            className={`${height <= 0 || height >= 100 ? `${styles.noHeight} ` : ''}${styles.scrollBarContainers}`}
        >
            <button
                ref={thumbRef}
                onMouseDown={onStart}
                onTouchStart={onStart}
                type="button"
                style={{ height: `${height}%`, translate: `0 ${scrolled < 0 ? 0 : scrolled}px` }}
                className={`${show ? `${styles.show} ` : ''}${styles.scrollThumb}`}
            />
        </div>
    );
};
export default ScrollBar;
