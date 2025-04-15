import { useRef } from 'react';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

import styles from './FilterOption.module.css';

function FilterOption({ text, setState, border, state, name, disabled }) {
	const eventRef = useRef(null);

	const btnRef = useRef(null);

	if (!eventRef.current) {
		let isForTouch = true;
		eventRef.current = {
			handleClick: () => {
				setState(prev => ({ ...prev, [name]: !prev[name] }), name);
				document.removeEventListener('mouseup', eventRef.current.handleClick);
			},
			handleToggle: e => {
				if (!e.touches) {
					return;
				}

				if (isForTouch) {
					setState(prev => ({ ...prev, [name]: !prev[name] }), name);
				}
				isForTouch = true;
			},
			removeEvent: e => {
				if (e.touches) {
					isForTouch = false;
				} else {
					document.removeEventListener('mouseup', eventRef.current.handleClick);
				}
			},
		};
	}

	return (
		<button
			className={`${border && styles.borderBot ? `${styles.borderBot} ` : ''}${
				styles.filterOption
			} ${styles.shadow}`}
			disabled={disabled}
			onMouseDown={e => {
				e.preventDefault();
				document.addEventListener('mouseup', eventRef.current.handleClick);
			}}
			ref={btnRef}
			type='button'
		>
			<p className={styles.text}>{text}</p>
			<div className={styles.toggleButtonContainer}>
				<ToggleSwitch
					disabled={disabled}
					mouseUpEvent={eventRef.current.handleToggle}
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
