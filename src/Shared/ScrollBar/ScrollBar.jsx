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

  const handleMove = useCallback(
    e => {
      const cursorInEle = e?.touches
        ? e.touches[0].pageY - thumbRef.current.getBoundingClientRect().y
        : e.pageY - thumbRef.current.getBoundingClientRect().y;

      if (!downElement.current) {
        downElement.current = cursorInEle;
      }

      setScrolled(prev => {
        if (prev + cursorInEle - downElement.current < 0) {
          parentRef.current.scrollTop = 0;
          return 0;
        }
        if (prev + cursorInEle - downElement.current > parentRef.current.clientHeight - thumbRef.current.clientHeight) {
          parentRef.current.scrollTop = parentRef.current.scrollHeight - parentRef.current.clientHeight;
          return parentRef.current.clientHeight - thumbRef.current.clientHeight;
        }

        parentRef.current.scrollTop =
          ((prev + cursorInEle - downElement.current) / (parentRef.current.clientHeight - thumbRef.current.clientHeight)) *
          (parentRef.current.scrollHeight - parentRef.current.clientHeight);
        return prev + cursorInEle - downElement.current;
      });
    },
    [parentRef]
  );

  const handleMouseUp = useCallback(() => {
    downElement.current = null;
  }, []);

  const onStart = useDragStartStop(handleMove, handleMouseUp);

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

  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(() => {
        const heightCheck = (parentRef.current.clientHeight / parentRef.current.scrollHeight) * 100;

        if (heightCheck > 100) {
          return 100;
        }
        return heightCheck;
      });
    });
  }, [childRef, parentRef]);

  useEffect(() => {
    new ResizeObserver(() => {
      setHeight(() => {
        const heightCheck = (parentRef.current.clientHeight / parentRef.current.scrollHeight) * 100;
        if (heightCheck > 100) {
          return 100;
        }
        return heightCheck;
      });
    }).observe(childRef.current);
    new ResizeObserver(() => {
      setHeight(() => {
        const heightCheck = (parentRef.current.clientHeight / parentRef.current.scrollHeight) * 100;
        if (heightCheck > 100) {
          return 100;
        }
        return heightCheck;
      });
    }).observe(parentRef.current);
    parentRef.current.addEventListener('scroll', () => {
      setShow(true);
      handleScrollHide();
      setScrolled(
        (parentRef.current.scrollTop / (parentRef.current.scrollHeight - parentRef.current.clientHeight)) *
          (parentRef.current.clientHeight - thumbRef.current.clientHeight)
      );
    });
    containerRef.current.addEventListener('mousemove', () => {
      setShow(true);
      handleScrollHide();
    });
  }, [childRef, parentRef]);

  return (
    <div ref={containerRef} className={`${height <= 0 || height >= 100 ? `${styles.noHeight} ` : ''}${styles.scrollBarContainers}`}>
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
