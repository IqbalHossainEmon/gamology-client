import { useCallback, useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import ImagePreview from '../../ImagePreview/ImagePreview';

const ImagePreviewContainer = ({ containerRef, btnRef, ...rest }) => {
    const [showPreview, setShowPreview] = useState(false);

    const showPreviewRef = useRef(showPreview);
    showPreviewRef.current = showPreview;

    const { show, fadeIn } = useAppearDisappear(showPreview);

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

    useEffect(() => {
        const container = containerRef.current;
        // container.addEventListener('mouseover', handleHover);
        // container.addEventListener('mouseleave', handleLeave);
        const btn = btnRef.current;
        btn.addEventListener('click', handleLeave);

        return () => {
            container.removeEventListener('mouseover', handleHover);
            container.removeEventListener('mouseleave', handleLeave);
            btn.removeEventListener('click', handleLeave);
        };
    }, [btnRef, containerRef, handleHover, handleLeave]);
    return !show && <ImagePreview containerRef={containerRef} show={!fadeIn} {...rest} />;
};
export default ImagePreviewContainer;
