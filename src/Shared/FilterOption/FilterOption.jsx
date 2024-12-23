import { useRef } from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import styles from './FilterOption.module.css';

function FilterOption({ text, setState, border, state, name }) {
	const eventRef = useRef(null);

	const btnRef = useRef(null);

	if (!eventRef.current) {
		let isForTouch = false;
		eventRef.current = {
			handleClick: e => {
				// Check if the event is on the btnRef
				if (btnRef.current.contains(e.target)) {
					setState(prev => ({ ...prev, [name]: !prev[name] }), name);
				}
				if (isForTouch) isForTouch = false;
			},
			handleTouchStart: () => {
				isForTouch = true;
				document.addEventListener('touchend', eventRef.current.handleClick, { once: true });
			},
			removeEvent: () => {
				if (isForTouch) {
					document.removeEventListener('touchend', eventRef.current.handleClick);
					isForTouch = false;
				} else document.removeEventListener('mouseup', eventRef.current.handleClick);
			},
		};
	}

	return (
		<button
			className={`${border && styles.borderBot ? `${styles.borderBot} ` : ''}${
				styles.filterOption
			} ${styles.shadow}`}
			onMouseDown={e => {
				e.preventDefault();
				document.addEventListener('mouseup', eventRef.current.handleClick, { once: true });
			}}
			ref={btnRef}
			type='button'
		>
			<p className={styles.text}>{text}</p>
			<div
				className={styles.toggleButtonContainer}
				onTouchStart={eventRef.current.handleTouchStart}
			>
				<ToggleSwitch
					event={eventRef.current.removeEvent}
					name={name}
					setState={setState}
					state={state}
				/>
			</div>
		</button>
	);
}

export default FilterOption;
