import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import useDropDownHide from '../../../Hooks/useDropDownHide';
import useIsTouchAble from '../../../Hooks/useIsTouchable';
import ImagePreview from '../../ImagePreview/ImagePreview';

function ImagePreviewContainer({ containerRef, btnRef, previewBtnRef, screenWidth, ...rest }) {
	const [showPreview, setShowPreview] = useState(false),

	 showPreviewRef = useRef(showPreview);
	showPreviewRef.current = showPreview;

	const isTouchAble = useIsTouchAble(),

	 { show, fadeIn } = useAppearDisappear(showPreview),

	 { showMenu, stopMenu, setElement } = useDropDownHide(setShowPreview),

	 timerId = useRef(null),
	 eventRefs = useRef(null);

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
		const previewBtn = previewBtnRef?.current,
		 container = containerRef?.current,
		 btn = btnRef?.current;
		let isEventAdded = false,
		 isMouseEventAdded = true;
		const touchAble = isTouchAble(),

		 touchEvent = () => {
			previewBtn.addEventListener('click', eventRefs.current.handleToggle);
			setElement(previewBtn);
			isEventAdded = true;
			isMouseEventAdded = false;
		},

		 mouseEvent = () => {
			container.addEventListener('mouseover', eventRefs.current.handleHover);
			container.addEventListener('mouseleave', eventRefs.current.handleLeave);
			btn.addEventListener('click', eventRefs.current.handleLeave);
			isEventAdded = true;
			isMouseEventAdded = true;
		},

		 removeMouseEvent = () => {
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
	return show && <ImagePreview
    containerRef={containerRef}
    show={fadeIn}
    {...rest}
	               />;
}
export default ImagePreviewContainer;
