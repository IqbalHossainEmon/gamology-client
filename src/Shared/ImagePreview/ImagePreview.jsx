import { useEffect, useRef } from 'react';
import styles from './ImagePreview.module.css';

function ImagePreview({ file, show }) {
	const imageRef = useRef(null);
	const srcRef = useRef(null);

	useEffect(() => {
		let isUrlCreated = false;

		if (file instanceof File) {
			srcRef.current = {
				url: URL.createObjectURL(file),
				name: file.name,
			};
			isUrlCreated = true;
		} else if (typeof file === 'string') {
			srcRef.current = {
				url: file,
				name: file.split('/').pop(),
			};
		}

		return () => {
			if (isUrlCreated) {
				URL.revokeObjectURL(srcRef.current);
				srcRef.current = null;
			}
		};
	}, [file]);

	return (
		<div className={styles.imagePreviewContainer}>
			<div className={`${styles.imagePreview}${show ? ` ${styles.show}` : ''}`}>
				<img
					className={styles.img}
					ref={imageRef}
					src={srcRef.current?.url}
					alt={`preview ${srcRef.current?.name}`}
				/>
			</div>
		</div>
	);
}

export default ImagePreview;
