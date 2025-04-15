import { useEffect, useState } from 'react';

import styles from './ImagePlaceholder.module.css';

function ImagePlaceholder({ currentState, placeholder }) {
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (currentState !== 0) {
			setTimeout(() => {
				setShow(false);
			}, 250);
		}
	}, [currentState]);

	return (
		show &&
		(placeholder ? (
			{
				...placeholder,
				props: {
					...placeholder.props,
					className: `${placeholder.props.className ? `${placeholder.props.className} ` : ''}${styles.placeholderGiven}${currentState !== 0 ? ` ${styles.placeholderFadeOut}` : ''}`,
				},
			}
		) : (
			<div
				className={`${styles.placeholder}${currentState !== 0 ? ` ${styles.placeholderFadeOut}` : ''}`}
			/>
		))
	);
}
export default ImagePlaceholder;
