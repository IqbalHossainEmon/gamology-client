import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './InfoFieldActionButton.module.css';

export default function InfoFieldActionButton({ onClick, text, disabled = false, tabIndexOff }) {
	const btnRef = useRef(null);

	return (
		<div className={`${disabled ? `${styles.disabled} ` : ''}${styles.addMoreButton}`}>
			<button
				className={styles.btn}
				onClick={onClick}
				ref={btnRef}
				type='button'
				{...(disabled && { disabled })}
				{...(tabIndexOff && { tabIndex: '-1' })}
			>
				{text}

				<ButtonWaterEffect btnRef={btnRef} />
			</button>
		</div>
	);
}
