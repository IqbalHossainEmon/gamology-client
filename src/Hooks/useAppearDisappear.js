import { useCallback, useEffect, useRef, useState } from 'react';

export default function useAppearDisappear(state, isAppear, condition = true) {
    const [show, setShow] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);
    const prevStateRef = useRef(false);

    const handleHideBtn = useCallback(() => {
        if (startTimeRef.current) {
            clearTimeout(startTimeRef.current);
            startTimeRef.current = null;
            setFadeIn(false);
            return;
        }
        if (endTimeRef.current) {
            return;
        }
        setFadeIn(false);
        endTimeRef.current = setTimeout(() => {
            setShow(false);
            endTimeRef.current = null;
        }, 200);
    }, []);

    const handleShow = useCallback(() => {
        if (endTimeRef.current) {
            clearTimeout(endTimeRef.current);
            endTimeRef.current = null;
            setFadeIn(true);
            return;
        }
        if (startTimeRef.current) {
            return;
        }
        setShow(true);
        startTimeRef.current = setTimeout(() => {
            setFadeIn(true);
            startTimeRef.current = null;
        }, 60);
    }, []);

    useEffect(() => {
        switch (isAppear) {
            case true:
                switch (state) {
                    case true:
                        handleHideBtn();
                        break;
                    default:
                        handleShow();
                        break;
                }
                break;
            default:
                if (prevStateRef.current !== state && condition) {
                    switch (state) {
                        case true:
                            handleHideBtn();
                            break;
                        default:
                            handleShow();
                            break;
                    }
                    prevStateRef.current = state;
                }
                break;
        }
    }, [state, handleHideBtn, handleShow, condition, isAppear]);

    return { show, fadeIn };
}
