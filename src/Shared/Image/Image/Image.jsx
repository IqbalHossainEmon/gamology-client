import { useEffect, useRef, useState } from 'react';
import ImageError from '../Component/ImageError/ImageError';
import ImagePlaceholder from '../Component/ImagePlaceholder/ImagePlaceholder';
import styles from './Image.module.css';

function Image({ data, alt, aspectRatioClassName, placeholder, className, ...rest }) {
	const [currentState, setCurrentState] = useState(0);
	const imgRef = useRef(null);
	const imgSrc = useRef({ src: '', needRevoke: false });

	if (data) {
		if (!imgSrc.current.src || imgSrc.current.src !== data) {
			if (typeof data === 'string') {
				imgSrc.current.src = data;
			} else if (data instanceof File || data instanceof Blob) {
				imgSrc.current.src = URL.createObjectURL(data);
				imgSrc.current.needRevoke = true;
			}
		}
	}

	useEffect(() => {
		const img = imgRef.current;
		if (img) {
			if (img.complete) setCurrentState(1);
			else
				img.onload = () => {
					setCurrentState(1);
				};
			img.onerror = () => {
				setCurrentState(-1);
			};

			const { src, needRevoke } = imgSrc.current;
			return () => {
				if (needRevoke) {
					URL.revokeObjectURL(src);
				}
			};
		}
	}, []);
	return (
		<div
			className={
				aspectRatioClassName
					? `${styles.imageContainer} ${aspectRatioClassName}`
					: styles.imageContainerNoAspectRatio
			}
		>
			<ImagePlaceholder currentState={currentState} placeholder={placeholder} />
			{currentState >= 0 ? (
				<img
					{...rest}
					ref={imgRef}
					src={imgSrc.current.src}
					alt={alt}
					className={`${className ? `${className} ` : ''}${aspectRatioClassName ? styles.imageWithAspectRatio : styles.imageNoAspectRatio}${currentState === 0 ? ` ${styles.loading}` : ''} ${styles.image}`}
				/>
			) : (
				<ImageError alt={alt} />
			)}
		</div>
	);
}
export default Image;
