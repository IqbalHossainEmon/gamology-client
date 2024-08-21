import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import useDropDownHide from '../../../Hooks/useDropDownHide';
import useIsTouchAble from '../../../Hooks/useIsTouchable';
import ImagePreview from '../../ImagePreview/ImagePreview';

function ImagePreviewContainer({ containerRef, btnRef, previewBtnRef, screenWidth, ...rest }) {
	const [showPreview, setShowPreview] = useState(false);
	const showPreviewRef = useRef(showPreview);
	showPreviewRef.current = showPreview;

	const isTouchAble = useIsTouchAble();
	const { show, fadeIn } = useAppearDisappear(showPreview);
	const { showMenu, stopMenu, setElement } = useDropDownHide(setShowPreview);
	const timerId = useRef(null);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleHover: () => {
				if (!showPreviewRef.current && !timerId.current) {
					timerId.current = setTimeout(() => {
						setShowPreview(true);
						timerId.current = null;
					}, 200);
				}
			},
			handleLeave: () => {
				if (timerId.current) {
					clearTimeout(timerId.current);
					timerId.current = null;
				} else if (showPreviewRef.current) {
					setShowPreview(false);
				}
			},
			handleToggle: () => {
				setShowPreview(prev => {
					if (prev) {
						stopMenu();
					} else {
						showMenu();
					}
					return !prev;
				});
			},
		};
	}
	useEffect(() => {
		const previewBtn = previewBtnRef?.current;
		const container = containerRef?.current;
		const btn = btnRef?.current;
		let isEventAdded = false;
		let isMouseEventAdded = true;
		const touchAble = isTouchAble();
		const touchEvent = () => {
			previewBtn.addEventListener('click', eventRefs.current.handleToggle);
			setElement(previewBtn);
			isEventAdded = true;
			isMouseEventAdded = false;
		};
		const mouseEvent = () => {
			container.addEventListener('mouseover', eventRefs.current.handleHover);
			container.addEventListener('mouseleave', eventRefs.current.handleLeave);
			btn.addEventListener('click', eventRefs.current.handleLeave);
			isEventAdded = true;
			isMouseEventAdded = true;
		};
		const removeMouseEvent = () => {
			container.removeEventListener('mouseover', eventRefs.current.handleHover);
			container.removeEventListener('mouseleave', eventRefs.current.handleLeave);
			btn.removeEventListener('click', eventRefs.current.handleLeave);
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
	}, [isTouchAble, previewBtnRef, containerRef, btnRef, screenWidth, setElement]);
	return show && <ImagePreview containerRef={containerRef} show={fadeIn} {...rest} />;
}
export default ImagePreviewContainer;
