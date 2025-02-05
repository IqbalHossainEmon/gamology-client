import { useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../Utils/Hooks/useDragStartStop';
import useHandleTimerTransition from '../../Utils/Hooks/useHandleTimerTransition';
import styles from './ToggleSwitch.module.css';

const rangePathWidth = 13;

function ToggleSwitch({
	state,
	setState,
	name,
	onSwitchMove,
	mouseDownEvent,
	mouseUpEvent,
	isLoading,
}) {
	const [circlePosition, setCirclePosition] = useState({
		translate: state ? rangePathWidth : 0,
		transition: false,
	});
	const prevState = useRef(state);
	const stateRef = useRef(circlePosition);
	stateRef.current = circlePosition.translate;

	const roundRef = useRef(null);
	const positionsRef = useRef(0);
	const startPositionRef = useRef(0);
	const parentStateRef = useRef(state);
	parentStateRef.current = state;

	const handleTimerTransition = useHandleTimerTransition(setCirclePosition, 1000);

	useEffect(() => {
		if (prevState.current !== state) {
			setCirclePosition({ translate: state ? rangePathWidth : 0, transition: true });
			handleTimerTransition();

			prevState.current = state;
		}
	}, [handleTimerTransition, state]);

	const eventRefs = useRef(null);

	const isMouseDown = useRef(false);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleMove: e => {
				if (onSwitchMove && isMouseDown.current) {
					isMouseDown.current = false;
					onSwitchMove();
				}

				const move = (e.touches ? e.touches[0].clientX : e.clientX) - positionsRef.current;
				const newPosition = startPositionRef.current + move;

				if (move > 0) {
					if (newPosition > rangePathWidth) {
						setCirclePosition(prev => ({ ...prev, translate: rangePathWidth }));
					} else {
						setCirclePosition(prev => ({ ...prev, translate: newPosition }));
					}
				} else if (newPosition < 0) {
					setCirclePosition(prev => ({ ...prev, translate: 0 }));
				} else {
					setCirclePosition(prev => ({ ...prev, translate: newPosition }));
				}
			},
			handleStart: e => {
				positionsRef.current = e.touches ? e.touches[0].clientX : e.clientX;
				startPositionRef.current = stateRef.current;
			},
			handleSetValue: e => {
				// If switch is below 50
				if (mouseUpEvent) {
					mouseUpEvent(e);
				}

				if (isMouseDown.current) isMouseDown.current = false;
				let isToggled = false;
				if (stateRef.current < rangePathWidth / 2) {
					isToggled = false;
				} else if (stateRef.current >= rangePathWidth / 2) {
					isToggled = true;
				}

				setCirclePosition({
					translate: isToggled ? rangePathWidth : 0,
					transition: true,
				});
				if (isToggled !== parentStateRef.current) {
					handleTimerTransition();
					setState(prev => ({ ...prev, [name]: isToggled }), name);
				}
			},
		};
	}

	const onStart = useDragStartStop(
		eventRefs.current.handleMove,
		eventRefs.current.handleSetValue
	);

	if (!eventRefs.current.handleBeginning) {
		eventRefs.current.handleBeginning = e => {
			onStart(e);
			isMouseDown.current = true;
			eventRefs.current.handleStart(e);
			if (mouseDownEvent) mouseDownEvent();
		};
	}

	return (
		<div
			className={`${styles.toggleButtonContainer}${
				isLoading ? ` ${styles.containerLoading}` : ''
			}`}
		>
			<div className={styles.toggleButton}>
				<div className={styles.activePathContainer}>
					<div
						className={`${styles.activePath}${
							circlePosition.transition ? ` ${styles.pathTransition}` : ''
						}${isLoading ? ` ${styles.activePathLoading}` : ''}`}
						style={{ scale: `${circlePosition.translate / rangePathWidth || 0} 1` }}
					/>
				</div>
				<div
					className={`${styles.roundContainer}${
						circlePosition.transition ? ` ${styles.roundTransition}` : ''
					}`}
					ref={roundRef}
					{...(circlePosition.translate && {
						style: {
							translate: `${circlePosition.translate}px`,
						},
					})}
				>
					<div
						className={`${styles.round}${
							circlePosition.translate > rangePathWidth / 2 ? ` ${styles.active}` : ''
						}`}
						onMouseDown={eventRefs.current.handleBeginning}
						onTouchStart={eventRefs.current.handleBeginning}
						role='switch'
						aria-checked={state}
						tabIndex='-1'
					/>
				</div>
			</div>
		</div>
	);
}

export default ToggleSwitch;
