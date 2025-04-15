import { useEffect, useRef, useState } from 'react';

import useDropDownHide from '../../../Utils/Hooks/useDropDownHide';
import ImagePreview from '../../ImagePreview/ImagePreview/ImagePreview';

function ImagePreviewContainer({
	containerRef,
	btnRef,
	previewBtnRef,
	setLoading,
	loading,
	touchAble,
	...rest
}) {
	const [showPreview, setShowPreview] = useState(false);
	const [show, setShow] = useState(false);

	const showPreviewRef = useRef(showPreview);
	showPreviewRef.current = showPreview;

	const showRef = useRef(show);
	showRef.current = show;

	const eventRefs = useRef(null);
	const timerIdShow = useRef(null);
	const timerIdHide = useRef(null);

	const imgRef = useRef(null);
	const positionRef = useRef(null);

	const loadingRef = useRef(loading);
	loadingRef.current = loading;

	if (!eventRefs.current) {
		eventRefs.current = {
			handleHide: () => {
				if (timerIdHide.current) {
					clearTimeout(timerIdHide.current);
				}
				if (loadingRef.current) {
					setLoading(false);
				}
				setShow(false);
				timerIdHide.current = setTimeout(() => {
					setShowPreview(false);
				}, 200);
			},
		};
	}

	const { showMenu, onHide, setElement } = useDropDownHide(eventRefs.current.handleHide);

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
			toggle: () => {
				if (showPreviewRef.current) {
					onHide();
					eventRefs.current.handleHide();
				} else {
					if (!loadingRef.current && !imgRef.current) {
						setLoading(true);
					}

					setShow(true);
					setShowPreview(true);
					showMenu();
				}
			},
		};
	}

	useEffect(() => {
		const btn = btnRef?.current;
		btn.addEventListener('click', eventRefs.current.handleLeave);
		return () => {
			btn.removeEventListener('click', eventRefs.current.handleLeave);
		};
	}, [btnRef]);

	useEffect(() => {
		const container = containerRef.current;
		const prevBtn = previewBtnRef?.current;

		let isMouseEventAdded = false;
		let isTouchEventAdded = false;

		const mouseEvent = () => {
			if (!isMouseEventAdded) {
				container.addEventListener('mousemove', eventRefs.current.handleHover);
				container.addEventListener('mouseleave', eventRefs.current.handleLeave);
				isMouseEventAdded = true;
			}
			if (isTouchEventAdded) {
				prevBtn.removeEventListener('click', eventRefs.current.toggle);
				isTouchEventAdded = false;
			}
		};
		const touchEvent = () => {
			if (isMouseEventAdded) {
				container.removeEventListener('mousemove', eventRefs.current.handleHover);
				container.removeEventListener('mouseleave', eventRefs.current.handleLeave);
				isMouseEventAdded = false;
			}
			if (!isTouchEventAdded) {
				setElement(prevBtn);
				prevBtn.addEventListener('click', eventRefs.current.toggle);
				isTouchEventAdded = false;
			}
		};

		if (showPreviewRef.current) {
			setShowPreview(false);
		}

		if (touchAble) {
			touchEvent();
		} else {
			mouseEvent();
		}
		return () => {
			if (isMouseEventAdded) {
				container.removeEventListener('mousemove', eventRefs.current.handleHover);
				container.removeEventListener('mouseleave', eventRefs.current.handleLeave);
				isMouseEventAdded = false;
			}
			if (isTouchEventAdded) {
				prevBtn.removeEventListener('click', eventRefs.current.toggle);
				isTouchEventAdded = false;
			}
		};
	}, [containerRef, btnRef, touchAble, previewBtnRef, setElement]);

	return (
		showPreview && (
			<ImagePreview
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
