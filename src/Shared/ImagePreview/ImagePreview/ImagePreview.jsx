import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import ImagePreviewBody from '../ImagePreviewBody/ImagePreviewBody';
import styles from './ImagePreview.module.css';

function ImagePreview({ file, isShow, containerIdName, containerRef, setLoading }) {
	const [position, setPosition] = useState(0);

	const imgRef = useRef(null);

	const isFirstRef = useRef(true);

	useEffect(() => {
		let isUrlCreated;
		if (isFirstRef.current) {
			isFirstRef.current = false;

			const img = new Image();

			if (file instanceof File) {
				img.src = isUrlCreated = URL.createObjectURL(file);
				img.alt = `preview ${file.name}`;
				isUrlCreated = true;
			} else if (typeof file === 'string') {
				img.src = file;
				img.alt = `preview ${file.split('/').pop().split('.')[0]}`;
			}

			img.className = styles.img;

			if (containerIdName) {
				img.onload = e => {
					const height = Math.min(window.innerHeight - 10 * 16, e.target.naturalHeight);

					const mainContainer = document.getElementById(containerIdName);

					if (containerRef.current.offsetTop + height > mainContainer.scrollHeight - 72) {
						setPosition(1);
					} else {
						setPosition(-1);
					}
					setLoading(false);

					imgRef.current = img;
				};
			}
		}
		return () => {
			if (isUrlCreated) {
				URL.revokeObjectURL(isUrlCreated);
			}
		};
	}, [containerIdName, containerRef, file, setLoading]);

	const [show, appear] = useAppearDisappear(position !== 0 && isShow);

	return show && <ImagePreviewBody position={position} appear={appear} img={imgRef.current} />;
}

export default ImagePreview;
