import { useCallback, useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import useDropDownHide from '../../../Hooks/useDropDownHide';
import useIsTouchAble from '../../../Hooks/useIsTouchable';
import ImagePreview from '../../ImagePreview/ImagePreview';

const ImagePreviewContainer = ({ containerRef, btnRef, previewBtnRef, screenWidth, ...rest }) => {
    const [showPreview, setShowPreview] = useState(false);

    const showPreviewRef = useRef(showPreview);
    showPreviewRef.current = showPreview;

    const isTouchAble = useIsTouchAble();

    const { show, fadeIn } = useAppearDisappear(showPreview);

    const { showMenu, stopMenu, setElement } = useDropDownHide(setShowPreview);

    const timerId = useRef(null);

    const handleHover = useCallback(() => {
        if (!showPreviewRef.current && !timerId.current) {
            timerId.current = setTimeout(() => {
                setShowPreview(true);
                timerId.current = null;
            }, 200);
        }
    }, []);
    const handleLeave = useCallback(() => {
        if (timerId.current) {
            clearTimeout(timerId.current);
            timerId.current = null;
        } else if (showPreviewRef.current) {
            setShowPreview(false);
        }
    }, []);

    const handleToggle = useCallback(() => {
        setShowPreview(prev => {
            if (prev) {
                stopMenu();
            } else {
                showMenu();
            }
            return !prev;
        });
    }, [showMenu, stopMenu]);

    useEffect(() => {
        const previewBtn = previewBtnRef?.current;
        const container = containerRef?.current;
        const btn = btnRef?.current;
        let isEventAdded = false;
        let isMouseEventAdded = true;
        const touchAble = isTouchAble();

        const touchEvent = () => {
            previewBtn.addEventListener('click', handleToggle);
            setElement(previewBtn);
            isEventAdded = true;
            isMouseEventAdded = false;
        };

        const mouseEvent = () => {
            container.addEventListener('mouseover', handleHover);
            container.addEventListener('mouseleave', handleLeave);
            btn.addEventListener('click', handleLeave);
            isEventAdded = true;
            isMouseEventAdded = true;
        };

        const removeMouseEvent = () => {
            container.removeEventListener('mouseover', handleHover);
            container.removeEventListener('mouseleave', handleLeave);
            btn.removeEventListener('click', handleLeave);
            isEventAdded = false;
            isMouseEventAdded = false;
        };
        if (showPreviewRef.current) {
            setShowPreview(false);
        }
        if (isEventAdded) {
            if (isMouseEventAdded && touchAble) {
                removeMouseEvent();
                touchEvent();
            } else {
                mouseEvent();
            }
        } else if (touchAble) {
            touchEvent();
        } else {
            mouseEvent();
        }
        return removeMouseEvent;
    }, [
        handleToggle,
        isTouchAble,
        previewBtnRef,
        containerRef,
        btnRef,
        handleHover,
        handleLeave,
        screenWidth,
        setElement,
    ]);
    return show && <ImagePreview containerRef={containerRef} show={fadeIn} {...rest} />;
};
export default ImagePreviewContainer;
