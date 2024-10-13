import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../Utils/Hooks/useDropDownHide';
import useIsTouchAble from '../../../Utils/Hooks/useIsTouchable';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import ImagePreview from '../../ImagePreview/ImagePreview/ImagePreview';

function ImagePreviewContainer({
	containerRef,
	btnRef,
	previewBtnRef,
	setLoading,
	loading,
	...rest
}) {
	const [showPreview, setShowPreview] = useState(false);
	const [show, setShow] = useState(false);

	const showPreviewRef = useRef(showPreview);
	showPreviewRef.current = showPreview;

	const showRef = useRef(show);
	showRef.current = show;

	const { screenWidth } = useScreenWidth();

	const isTouchAble = useIsTouchAble();

	const eventRefs = useRef(null);
	const timerIdShow = useRef(null);
	const timerIdHide = useRef(null);

	const imgRef = useRef(null);
	const positionRef = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleHide: () => {
				if (timerIdHide.current) {
					clearTimeout(timerIdHide.current);
				}
				setShow(false);
				timerIdHide.current = setTimeout(() => {
					setShowPreview(false);
				}, 200);
			},
		};
	}

	const { showMenu, onHide, setElement } = useDropDownHide(eventRefs.current.handleHide);

	const loadingRef = useRef(loading);
	loadingRef.current = loading;

	if (!eventRefs.current.handleHover) {
		eventRefs.current = {
			...eventRefs.current,
			handleHover: () => {
				if (timerIdHide.current) {
					clearTimeout(timerIdHide.current);
					timerIdHide.current = null;
				}
				if (!showPreviewRef.current || !showRef.current) {
					if (timerIdShow.current) {
						clearTimeout(timerIdShow.current);
					}
					timerIdShow.current = setTimeout(() => {
						setShow(true);

						setShowPreview(true);
						if (!loadingRef.current && !imgRef.current) {
							setLoading(true);
						}
						timerIdShow.current = null;
					}, 200);
				}
			},
			handleLeave: () => {
				if (timerIdShow.current) {
					clearTimeout(timerIdShow.current);
					timerIdShow.current = null;
				} else if (showPreviewRef.current) {
					eventRefs.current.handleHide();
					if (loadingRef.current) {
						setLoading(false);
					}
				}
			},
			handleToggle: () => {
				if (showPreviewRef.current) {
					onHide();
					setShow(false);
					eventRefs.current.handleHide();
				} else {
					setShow(true);
					showMenu();
					setShowPreview(true);
				}
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
			container.addEventListener('mousemove', eventRefs.current.handleHover);
			container.addEventListener('mouseleave', eventRefs.current.handleLeave);
			btn.addEventListener('click', eventRefs.current.handleLeave);
			isEventAdded = true;
			isMouseEventAdded = true;
		};
		const removeMouseEvent = () => {
			container.removeEventListener('mousemove', eventRefs.current.handleHover);
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

	return (
		showPreview && (
			<ImagePreview
				containerIdName='dashboard-body'
				containerRef={containerRef}
				setLoading={setLoading}
				isShow={show}
				imgRef={imgRef}
				positionRef={positionRef}
				{...rest}
			/>
		)
	);
}
export default ImagePreviewContainer;
