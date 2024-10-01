import { useEffect, useRef, useState } from 'react';

export default function useAppearDisappear(state, isAppear, condition = true, duration = 200) {
	const [show, setShow] = useState(false);
	const [fadeIn, setFadeIn] = useState(false);
	const startTimeRef = useRef(null);
	const endTimeRef = useRef(null);
	const prevStateRef = useRef(state);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleHideBtn: () => {
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
				}, duration);
			},
			handleShow: () => {
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
			},
		};
	}

	useEffect(() => {
		switch (isAppear) {
			case true:
				switch (state) {
					case true:
						eventRefs.current.handleShow();
						break;
					default:
						eventRefs.current.handleHideBtn();
						break;
				}
				break;
			default:
				if (prevStateRef.current !== state && condition) {
					switch (state) {
						case true:
							eventRefs.current.handleShow();
							break;
						default:
							eventRefs.current.handleHideBtn();
							break;
					}
					prevStateRef.current = state;
				}
				break;
		}
	}, [state, condition, isAppear]);

	return [show, fadeIn];
}
