import { useRef } from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import styles from './FilterOption.module.css';

import PropTypes from 'prop-types';

function FilterOption({ text, setState, border, state, name }) {
	FilterOption.propTypes = {
		text: PropTypes.string.isRequired,
		setState: PropTypes.func.isRequired,
		border: PropTypes.bool,
		state: PropTypes.any.isRequired,
		name: PropTypes.string.isRequired,
	};
	const eventRef = useRef(null);

	const btnRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			handleClick: e => {
				// check if the event is on the btnRef
				if (btnRef.current.contains(e.target)) {
					setState(prev => ({ ...prev, [name]: !prev[name] }), name);
				}
			},
		};
	}

	return (
		<button
			type='button'
			ref={btnRef}
			onMouseDown={el => {
				el.preventDefault();
				document.addEventListener('mouseup', eventRef.current.handleClick, { once: true });
			}}
			className={`${border && styles.borderBot ? `${styles.borderBot} ` : ''}${
				styles.filterOption
			} ${styles.shadow}`}
		>
			<p className={styles.text}>{text}</p>
			<div className={styles.toggleButtonContainer}>
				<ToggleSwitch
					event={eventRef.current.handleClick}
					state={state}
					setState={setState}
					name={name}
					isLoading
				/>
			</div>
		</button>
	);
}

export default FilterOption;
