import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import TextField from '../../../../../../../../../../../Shared/TextField/TextField/TextField';
import styles from './TagOrCategoryDeleteBody.module.css';

function TagOrCategoryDeleteBody({ handleHide, text, handler }) {
	const [errorChange, setErrorChange] = useState(0);
	const checkText = useRef('');

	const btnRef = useRef(null);

	return (
		<div className={styles.modalBody}>
			<p className={styles.modelBody}>{text}</p>
			<div className={styles.checkPoint}>
				<TextField
					errorChange={errorChange}
					errorMessage={checkText.errorMessage}
					field='input'
					htmlFor='TagOrCategoryDelete'
					placeholder="Type 'DELETE' to confirm"
					setState={val => {
						checkText.current = val;
					}}
				/>
			</div>
			<div className={styles.btnContainer}>
				<button
					ref={btnRef}
					className={styles.deleteBtn}
					onClick={() => {
						if (checkText.current.toLowerCase() !== 'delete') {
							checkText.errorMessage = 'Please type "DELETE" to confirm';
							setErrorChange(prev => prev + 1);
							return;
						}
						handler();
						handleHide();
					}}
					type='button'
				>
					Delete
					<ButtonWaterEffect btnRef={btnRef} long />
				</button>
			</div>
		</div>
	);
}
export default TagOrCategoryDeleteBody;
