import { useCallback, useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useDragStartStop(event, handleMouseUp = () => {}, handleMouseDown = () => {}, grab = false) {
    const isTouchAble = useIsTouchAble();

    const eventRef = useRef(null);

    eventRef.onStop = useCallback(
        e => {
            document.removeEventListener('mousemove', event.current);
            document.removeEventListener('touchmove', event.current);
            document.removeEventListener('mouseup', eventRef.onStop);
            document.removeEventListener('touchend', eventRef.onStop);
            window.removeEventListener('blur', eventRef.onStop);

            handleMouseUp(e);
            if (document.getElementById('root').classList.contains('grabbing')) {
                document.getElementById('root').removeAttribute('class');
            }
        },
        [handleMouseUp, event]
    );

    eventRef.onStart = useCallback(
        e => {
            handleMouseDown(e);
            document.addEventListener('mousemove', event.current);
            document.addEventListener('touchmove', event.current);
            document.addEventListener('mouseup', eventRef.onStop);
            document.addEventListener('touchend', eventRef.onStop);
            window.addEventListener('blur', eventRef.onStop);

            if (!isTouchAble() && grab) {
                e.preventDefault();
                document.getElementById('root').classList.add('grabbing');
            }
        },
        [grab, handleMouseDown, event, isTouchAble]
    );
    return eventRef.onStart;
}
