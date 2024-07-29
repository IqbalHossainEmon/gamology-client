import { useCallback, useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useDragStartStop(
    moveEvent,
    handleMouseUp = () => {},
    handleMouseDown = () => {},
    grab = false
) {
    const isTouchAble = useIsTouchAble();

    const eventRefs = useRef({
        onStart: () => {},
        onStop: () => {},
    });

    eventRefs.current.onStop = useCallback(
        e => {
            document.removeEventListener('mousemove', moveEvent);
            document.removeEventListener('touchmove', moveEvent);
            document.removeEventListener('mouseup', eventRefs.current.onStop);
            document.removeEventListener('touchend', eventRefs.current.onStop);
            window.removeEventListener('blur', eventRefs.current.onStop);

            handleMouseUp(e);
            if (document.getElementById('root').classList.contains('grabbing')) {
                document.getElementById('root').removeAttribute('class');
            }
        },
        [handleMouseUp, moveEvent]
    );

    eventRefs.current.onStart = useCallback(
        e => {
            handleMouseDown(e);
            document.addEventListener('mousemove', moveEvent);
            document.addEventListener('touchmove', moveEvent);
            document.addEventListener('mouseup', eventRefs.current.onStop);
            document.addEventListener('touchend', eventRefs.current.onStop);
            window.addEventListener('blur', eventRefs.current.onStop);

            if (!isTouchAble() && grab) {
                e.preventDefault();
                document.getElementById('root').classList.add('grabbing');
            }
        },
        [grab, handleMouseDown, moveEvent, isTouchAble]
    );

    return eventRefs.current.onStart;
}
