import { useState } from 'react';
import styles from './IndiGameReviewInput.module.css';
function IndiGameReviewInput({ setData, isTextArea }) {
	const [value, setValue] = useState('');
	const [scrollable, setScrollable] = useState(false);
	return (
		<div className={styles.container}>
			{isTextArea ? (
				<textarea
					className={`${styles.description}${scrollable ? ` ${styles.scrollable}` : ''}`}
					name='review description'
					onBlur={e => {
						if (value.length <= 40) {
							setData(prev => ({ ...prev, text: e.target.value }));
						} else {
							setData(prev => ({ ...prev, text: '' }));
						}
					}}
					onChange={e => {
						setValue(e.target.value);
						if (e.target.clientHeight < e.target.scrollHeight) {
							setScrollable(true);
						} else {
							setScrollable(false);
						}
					}}
					placeholder='Review text...'
					rows='10'
					value={value}
				/>
			) : (
				<input
					className={styles.reviewTitle}
					id='review-title'
					name='review title'
					onBlur={e => {
						if (value.length <= 40) {
							setData(prev => ({ ...prev, title: e.target.value }));
						} else {
							setData(prev => ({ ...prev, title: '' }));
						}
					}}
					onChange={e => setValue(e.target.value)}
					placeholder='Review Title...'
					type='text'
					value={value}
				/>
			)}
			<p
				className={
					value.length <= (isTextArea ? 2000 : 40) &&
					value.length >= (isTextArea ? 1800 : 20)
						? [styles.remainingWords, styles.warning].join(' ')
						: value.length > (isTextArea ? 2000 : 40)
							? [styles.remainingWords, styles.negative].join(' ')
							: styles.remainingWords
				}
			>
				<small>{(isTextArea ? 2000 : 40) - value.length}</small>
			</p>
		</div>
	);
}
export default IndiGameReviewInput;
