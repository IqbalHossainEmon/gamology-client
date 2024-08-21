import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../Hooks/useDragStartStop';
import useHandleTimerTransition from '../../Hooks/useHandleTimerTransition';
import styles from './ToggleSwitch.module.css';

const rangePathWidth = 13;

function ToggleSwitch({ state, setState, name, event, mouseDownEvent, mouseUpEvent, isLoading }) {
	ToggleSwitch.propTypes = {
		state: PropTypes.bool.isRequired,
		setState: PropTypes.func.isRequired,
		name: PropTypes.string.isRequired,
		event: PropTypes.func.isRequired,
		mouseDownEvent: PropTypes.func,
		mouseUpEvent: PropTypes.func,
		isLoading: PropTypes.bool,
	};

	const [circlePosition, setCirclePosition] = useState({
			translate: state ? rangePathWidth : 0,
			transition: false,
		}),
		prevState = useRef(state),
		stateRef = useRef(circlePosition);
	stateRef.current = circlePosition.translate;

	const mainStateRef = useRef(state);
	mainStateRef.current = state;

	const roundRef = useRef(null),
		positionsRef = useRef(0),
		handleTimerTransition = useHandleTimerTransition(setCirclePosition, 1000);

	useEffect(() => {
		if (prevState.current !== state) {
			if (state) {
				setCirclePosition({ translate: rangePathWidth, transition: true });
				handleTimerTransition();
			} else {
				setCirclePosition({ translate: 0, transition: true });
				handleTimerTransition();
			}
			prevState.current = state;
		}
	}, [handleTimerTransition, state]);

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleMove: e => {
				document.removeEventListener('mouseup', event);

				const move = (e.touches ? e.touches[0].clientX : e.clientX) - positionsRef.current,
					newPosition = positionsRef.start + move;

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
				positionsRef.start = stateRef.current;
			},
			handleSetValue: () => {
				// If switch is below 50
				if (mouseUpEvent) {
					mouseUpEvent();
				}
				if (stateRef.current < rangePathWidth / 2) {
					if (stateRef.current !== 0) {
						setCirclePosition({ translate: 0, transition: true });
						handleTimerTransition();
					}
					if (mainStateRef.current) {
						setState(prev => ({ ...prev, [name]: false }), name);
					}
				} else if (stateRef.current >= rangePathWidth / 2) {
					if (stateRef.current !== rangePathWidth) {
						setCirclePosition({ translate: rangePathWidth, transition: true });
						handleTimerTransition();
					}
					if (!mainStateRef.current) {
						setState(prev => ({ ...prev, [name]: true }), name);
					}
				}
			},
		};
	}

	const onStart = useDragStartStop(
		eventRefs.current.handleMove,
		eventRefs.current.handleSetValue,
		mouseDownEvent && mouseDownEvent
	);

	if (!eventRefs.current.handleBeginning) {
		eventRefs.current.handleBeginning = e => {
			onStart(e);
			eventRefs.current.handleStart(e);
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
						role="switch"
						aria-checked={mainStateRef.current}
						tabIndex="0"
					/>
				</div>
			</div>
		</div>
	);
}

export default ToggleSwitch;
