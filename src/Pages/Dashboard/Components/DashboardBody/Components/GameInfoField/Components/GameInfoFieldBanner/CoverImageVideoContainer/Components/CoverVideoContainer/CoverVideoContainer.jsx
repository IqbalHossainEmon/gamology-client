import { useState } from 'react';
import styles from './CoverVideoContainer.module.css';

function CoverVideoContainer({
	inputRef,
	number,
	onFocus,
	onBlur,
	name,
	errorShow,
	setErrorShow,
	mainValue,
}) {
	const [value, setValue] = useState(mainValue);

	return (
		<input
			className={styles.field}
			id={`addGameBannerCover_${number}`}
			name={name}
			onBlur={onBlur}
			onChange={e => {
				setValue(e.target.value);
				if (errorShow) {
					setErrorShow(false);
				}
			}}
			onFocus={onFocus}
			ref={inputRef}
			type="text"
			value={value}
		/>
	);
}
export default CoverVideoContainer;
