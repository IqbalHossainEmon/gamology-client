import { useCallback, useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useDragStartStop(event, handleMouseUp = () => {}, handleMouseDown = () => {}, grab = false) {
    const isTouchAble = useIsTouchAble();

    const eventRefs = useRef({
        onStart: () => {},
        onStop: () => {},
    });

    eventRefs.current.onStop = useCallback(
        e => {
            document.removeEventListener('mousemove', event.current);
            document.removeEventListener('touchmove', event.current);
            document.removeEventListener('mouseup', eventRefs.current.onStop);
            document.removeEventListener('touchend', eventRefs.current.onStop);
            window.removeEventListener('blur', eventRefs.current.onStop);

            handleMouseUp(e);
            if (document.getElementById('root').classList.contains('grabbing')) {
                document.getElementById('root').removeAttribute('class');
            }
        },
        [handleMouseUp, event]
    );

    eventRefs.current.onStart = useCallback(
        e => {
            handleMouseDown(e);
            document.addEventListener('mousemove', event.current);
            document.addEventListener('touchmove', event.current);
            document.addEventListener('mouseup', eventRefs.current.onStop);
            document.addEventListener('touchend', eventRefs.current.onStop);
            window.addEventListener('blur', eventRefs.current.onStop);

            if (!isTouchAble() && grab) {
                e.preventDefault();
                document.getElementById('root').classList.add('grabbing');
            }
        },
        [grab, handleMouseDown, event, isTouchAble]
    );

    return eventRefs.current.onStart;
}
