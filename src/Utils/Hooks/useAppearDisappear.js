import { useEffect, useRef, useState } from 'react';

export default function useAppearDisappear(state, isAppear, condition = true, duration = 200) {
	const [show, setShow] = useState(false);
	const [fadeIn, setFadeIn] = useState(false);
	const startTimeRef = useRef(null);
	const endTimeRef = useRef(null);
	const prevStateRef = useRef(state);

	const fadeInRef = useRef(fadeIn);

	useEffect(() => {
		fadeInRef.current = fadeIn;
	}, [fadeIn]);

	useEffect(() => {
		const handleHideBtn = () => {
			if (startTimeRef.current) {
				clearTimeout(startTimeRef.current);
				startTimeRef.current = null;
				setShow(false);
				return;
			}
			if (endTimeRef.current) {
				return;
			}
			if (fadeInRef.current) {
				setFadeIn(false);
				endTimeRef.current = setTimeout(() => {
					setShow(false);
					endTimeRef.current = null;
				}, duration);
			}
		};

		const handleShow = () => {
			if (endTimeRef.current) {
				clearTimeout(endTimeRef.current);
				endTimeRef.current = null;
				setFadeIn(true);
				return;
			}
			if (startTimeRef.current) {
				return;
			}
			if (!fadeInRef.current) {
				setShow(true);
				startTimeRef.current = setTimeout(() => {
					setFadeIn(true);
					startTimeRef.current = null;
				}, 60);
			}
		};

		switch (isAppear) {
			case true:
				switch (state) {
					case true:
						handleShow();
						break;
					default:
						handleHideBtn();
						break;
				}
				break;
			default:
				if (prevStateRef.current !== state && condition) {
					switch (state) {
						case true:
							handleShow();
							break;
						default:
							handleHideBtn();
							break;
					}
					prevStateRef.current = state;
				}
				break;
		}
	}, [state, condition, isAppear, duration]);

	return [show, fadeIn];
}
