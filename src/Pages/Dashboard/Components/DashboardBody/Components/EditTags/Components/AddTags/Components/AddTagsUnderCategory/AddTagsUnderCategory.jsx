import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import TextField from '../../../../../../../../../../Shared/TextField/TextField';
import styles from './AddTagsUnderCategory.module.css';

function AddTagsUnderCategory({ infoRef, errorChange, errorMessage }) {
	const [numberOfTags, setNumberOfTags] = useState(1);
	const addBtnREf = useRef(null);
	const removeBtnREf = useRef(null);

	return (
		<div className={styles.tagsUnderCategory}>
			<div>
				{[...Array(numberOfTags).keys()].map(key => (
					<div className={styles.tagField} key={key}>
						<TextField
							errorChange={errorChange}
							errorMessage={errorMessage[key]}
							field="input"
							htmlFor={`tagName-${key}`}
							key={key}
							name={key}
							placeholder="Tag Name"
							setState={(val, name) => {
								infoRef[name] = val;
							}}
						/>
					</div>
				))}
			</div>
			<div className={styles.btnContainer}>
				<div className={styles.addTagBtn}>
					<button
						onClick={() => {
							setNumberOfTags(prev => prev + 1);
							infoRef.push('');
						}}
						ref={addBtnREf}
						type="button"
					>
						Add More +
						<ButtonWaterEffect btnRef={addBtnREf} />
					</button>
				</div>

				<div
					className={`${styles.removeTagBtn}${numberOfTags === 1 ? ` ${styles.disabled}` : ''}`}
				>
					<button
						disabled={numberOfTags === 1}
						onClick={() => {
							setNumberOfTags(prev => {
								if (prev > 1) {
									infoRef.pop();
									return prev - 1;
								}
								return prev;
							});
						}}
						ref={removeBtnREf}
						type="button"
					>
						Remove One -
						<ButtonWaterEffect btnRef={removeBtnREf} />
					</button>
				</div>
			</div>
		</div>
	);
}
export default AddTagsUnderCategory;
