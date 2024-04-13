import { useCallback, useRef } from 'react';

const useDropDownHide = setState => {
    const element = useRef();

    const closeMenuBlurRef = useRef(null);
    const closeMenu = useRef(null);

    closeMenu.current = useCallback(
        e => {
            switch (Array.isArray(element.current)) {
                case true:
                    if (!element.current.some(ele => ele?.contains(e.target)) && e) {
                        document.removeEventListener('mousedown', closeMenu.current);
                        window.removeEventListener('blur', closeMenuBlurRef.current);
                        setState(false);
                    }
                    break;
                default:
                    if (element.current && e && !element.current.contains(e.target)) {
                        document.removeEventListener('mousedown', closeMenu.current);
                        window.removeEventListener('blur', closeMenuBlurRef.current);
                        setState(false);
                        console.log('Close Menu');
                    }
                    break;
            }
        },
        [setState]
    );

    closeMenuBlurRef.current = useCallback(() => {
        setState(false);
        window.removeEventListener('blur', closeMenuBlurRef.current);
        document.removeEventListener('mousedown', closeMenu.current);
    }, [setState]);

    const stopMenu = useCallback(() => {
        document.removeEventListener('mousedown', closeMenu.current);
        window.removeEventListener('blur', closeMenuBlurRef.current);
    }, []);

    const setElement = useCallback(ele => {
        element.current = ele;
    }, []);

    const showMenu = useCallback(() => {
        document.addEventListener('mousedown', closeMenu.current);
        window.addEventListener('blur', closeMenuBlurRef.current);
    }, []);

    return { showMenu, setElement, stopMenu };
};

export default useDropDownHide;
