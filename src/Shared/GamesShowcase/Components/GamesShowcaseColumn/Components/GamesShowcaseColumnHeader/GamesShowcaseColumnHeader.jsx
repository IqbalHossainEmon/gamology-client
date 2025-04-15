import { useEffect, useRef } from 'react';

import TextField from '../../../../../TextField/TextField/TextField';

import styles from './GamesShowcaseColumnHeader.module.css';

export default function GamesShowcaseColumnHeader({
	headerTitle,
	index,
	setHeader,
	isEditing,
	parentIndex,
	titleValueResetRef,
}) {
	const titleResetValueRef = useRef(null);

	useEffect(() => {
		const refCurrent = titleValueResetRef.current;

		refCurrent[index] = () => titleResetValueRef.current(headerTitle);
		return () => {
			delete refCurrent[index];
		};
	}, [headerTitle, index, titleValueResetRef]);

	return isEditing ? (
		<div className={styles.textFieldContainer}>
			<TextField
				field='input'
				setState={val => setHeader(val, index)}
				defaultValue={headerTitle}
				placeholder='Enter the Header Title'
				htmlFor={`gameShowCaseHeader${index}${parentIndex}`}
				valueUpdaterRef={titleResetValueRef}
			/>
		</div>
	) : (
		<h4 className={styles.gamesShowcaseColumnHeader}>
			{headerTitle}
			<span className={styles.arrow}>
				<svg className='svg css-uwwqev' viewBox='0 0 5 9'>
					<path d='M1 1l3 3.5L1 8' fill='none' fillRule='evenodd' stroke='currentColor' />
				</svg>
			</span>
		</h4>
	);
}
