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
				if (btnRef.current?.contains(e.target)) {
					setState(prev => ({ ...prev, [name]: !prev[name] }), name);
				}
				if (isForTouch) isForTouch = false;
			},
			handleTouchStart: () => {
				isForTouch = true;
				document.addEventListener('touchend', eventRef.current.handleClick);
			},
			removeEvent: () => {
				switch (isForTouch) {
					case true:
						document.removeEventListener('touchend', eventRef.current.handleClick);
						isForTouch = false;
						break;
					case false:
						document.removeEventListener('mouseup', eventRef.current.handleClick);
						break;
					default:
						break;
				}
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
				document.addEventListener('mouseup', eventRef.current.handleClick);
			}}
			onTouchStart={eventRef.current.handleTouchStart}
			ref={btnRef}
			type='button'
		>
			<p className={styles.text}>{text}</p>
			<div className={styles.toggleButtonContainer}>
				<ToggleSwitch
					onSwitchMove={eventRef.current.removeEvent}
					name={name}
					setState={setState}
					state={state}
				/>
			</div>
		</button>
	);
}

export default FilterOption;
