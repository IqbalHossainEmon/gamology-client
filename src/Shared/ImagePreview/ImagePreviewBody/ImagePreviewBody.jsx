import { useEffect, useRef } from 'react';

import styles from './ImagePreviewBody.module.css';

function ImagePreviewBody({ position, appear, img }) {
	const imageContainerRef = useRef(null);

	useEffect(() => {
		imageContainerRef.current.appendChild(img);
	}, [img]);

	return (
		<div
			className={`${styles.imagePreviewContainer}${position > 0 ? ` ${styles.imagePreviewContainerTop}` : ''}`}
		>
			<div
				ref={imageContainerRef}
				className={`${styles.imagePreview} ${position > 0 ? styles.imagePreviewTop : styles.imagePreviewBottom}${appear ? ` ${styles.show}` : ''}`}
			/>
		</div>
	);
}
export default ImagePreviewBody;
