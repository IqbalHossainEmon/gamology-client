import { useCallback, useRef } from 'react';

const useDropDownHide = setState => {
    const element = useRef();
    const eventRefs = useRef({
        closeMenu: () => {},
        closeMenuBlur: () => {},
    });

    eventRefs.current.closeMenu = useCallback(
        e => {
            switch (Array.isArray(element.current)) {
                case true:
                    if (!element.current.some(ele => ele?.contains(e.target)) && e) {
                        document.removeEventListener('mousedown', eventRefs.current.closeMenu);
                        window.removeEventListener('blur', eventRefs.current.closeMenuBlur);
                        setState(false);
                    }
                    break;
                default:
                    if (element.current && e && !element.current.contains(e.target)) {
                        document.removeEventListener('mousedown', eventRefs.current.closeMenu);
                        window.removeEventListener('blur', eventRefs.current.closeMenuBlur);
                        setState(false);
                    }
                    break;
            }
        },
        [setState]
    );

    eventRefs.current.closeMenuBlur = useCallback(() => {
        setState(false);
        window.removeEventListener('blur', eventRefs.current.closeMenuBlur);
        document.removeEventListener('mousedown', eventRefs.current.closeMenu);
    }, [setState]);

    const stopMenu = useCallback(() => {
        document.removeEventListener('mousedown', eventRefs.current.closeMenu);
        window.removeEventListener('blur', eventRefs.current.closeMenuBlur);
    }, []);

    const setElement = useCallback(ele => {
        element.current = ele;
    }, []);

    const showMenu = useCallback(() => {
        document.addEventListener('mousedown', eventRefs.current.closeMenu);
        window.addEventListener('blur', eventRefs.current.closeMenuBlur);
    }, []);

    return { showMenu, setElement, stopMenu };
};

export default useDropDownHide;
