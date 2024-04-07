import { useCallback, useEffect, useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useChangeBodyOverflow() {
    const touchAble = useRef();
    const root = useRef();

    useEffect(() => {
        root.current = document.getElementById('root');
    }, []);

    const isTouchable = useIsTouchAble();

    const hideBodyOverflow = useCallback(() => {
        touchAble.current = isTouchable();

        if (
            !touchAble.current &&
            !root.current.classList.contains('margin-right-8px') &&
            !document.body.classList.contains('overflow-y-hidden') &&
            root.current.scrollHeight > window.innerHeight
        ) {
            document.body.classList.add('overflow-y-hidden');
            root.current.classList.add('margin-right-8px');
        } else if (touchAble.current) {
            document.body.classList.add('overflow-y-hidden');
        }
    }, [isTouchable]);

    const showBodyOverflow = useCallback(() => {
        if (root.current.classList.contains('margin-right-8px')) {
            root.current.removeAttribute('class');
        }
        if (document.body.classList.contains('overflow-y-hidden')) {
            document.body.removeAttribute('class');
        }
    }, []);

    return { hideBodyOverflow, showBodyOverflow };
}
