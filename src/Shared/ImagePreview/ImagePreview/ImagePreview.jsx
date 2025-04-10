import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import ImagePreviewBody from '../ImagePreviewBody/ImagePreviewBody';
import styles from './ImagePreview.module.css';

function ImagePreview({
	file,
	isShow,
	containerIdName,
	containerRef,
	setLoading,
	imgRef,
	positionRef,
}) {
	const [position, setPosition] = useState(positionRef.current || 0);

	const isFirstRef = useRef(true);

	useEffect(() => {
		if (isFirstRef.current && !imgRef.current) {
			isFirstRef.current = false;

			const img = new Image();

			if (file instanceof File) {
				img.src = URL.createObjectURL(file);
				img.alt = `preview ${file.name}`;
				return () => {
					URL.revokeObjectURL(img.src);
				};
			}
			if (typeof file === 'string') {
				img.src = file;
				img.alt = `preview ${file.split('/').pop().split('.')[0]}`;
			}

			img.className = styles.img;

			img.onload = e => {
				const height = Math.min(window.innerHeight - 10 * 16, e.target.naturalHeight);

				let mainContainer;
				if (containerIdName) {
					mainContainer = document.getElementById(containerIdName);
				} else {
					mainContainer = document.getElementById('root');
				}

				if (containerRef.current.offsetTop + height > mainContainer.scrollHeight - 72) {
					setPosition(1);
					positionRef.current = 1;
				} else {
					setPosition(-1);
					positionRef.current = -1;
				}
				setLoading(false);

				imgRef.current = img;
			};
		}
	}, [containerIdName, containerRef, file, imgRef, positionRef, setLoading]);

	const [show, appear] = useAppearDisappear(position !== 0 && isShow, true);

	return show && <ImagePreviewBody position={position} appear={appear} img={imgRef.current} />;
}

export default ImagePreview;
