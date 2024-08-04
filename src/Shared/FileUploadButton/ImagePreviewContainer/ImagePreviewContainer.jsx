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

    const { showMenu, stopMenu } = useDropDownHide(setShowPreview);

    const handleHover = useCallback(() => {
        if (!showPreviewRef.current) {
            setShowPreview(true);
        }
    }, []);
    const handleLeave = useCallback(() => {
        if (showPreviewRef.current) {
            setShowPreview(false);
        }
    }, []);

    const handleToggle = useCallback(() => {
        setShowPreview(prev => {
            if (prev) {
                showMenu();
            } else {
                stopMenu();
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

        if (isEventAdded) {
            if (isMouseEventAdded && touchAble) {
                container.addEventListener('mouseover', handleHover);
                touchEvent();
            }
        }
        return () => {
            if (isMouseEventAdded) {
                container.removeEventListener('mouseover', handleHover);
                container.removeEventListener('mouseleave', handleLeave);
                btn.removeEventListener('click', handleLeave);
            }
        };
    }, [handleToggle, isTouchAble, previewBtnRef, containerRef, btnRef, handleHover, handleLeave, screenWidth]);
    return show && <ImagePreview containerRef={containerRef} show={fadeIn} {...rest} />;
};
export default ImagePreviewContainer;
