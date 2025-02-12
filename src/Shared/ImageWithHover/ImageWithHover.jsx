import { useEffect, useRef, useState } from 'react';
import Image from '../Image/Image/Image';
import styles from './ImageWithHover.module.css';

function ImageWithHover({ container, game, cardHover, ...props }) {
	const [hoverShow, setHoverShow] = useState(false);

	const eventRefs = useRef(null);
	const shouldHideRef = useRef(true);

	if (!eventRefs.current) {
		eventRefs.current = {
			mouseEnter: () => setHoverShow(true),
			mouseLeave: () => {
				if (shouldHideRef.current) {
					setHoverShow(false);
				}
			},
		};
	}

	useEffect(() => {
		const containerElement = container?.current;

		if (containerElement) {
			containerElement.addEventListener('mouseenter', eventRefs.current.mouseEnter);
			containerElement.addEventListener('mouseleave', eventRefs.current.mouseLeave);
		}

		return () => {
			if (containerElement) {
				containerElement.removeEventListener('mouseenter', eventRefs.current.mouseEnter);
				containerElement.removeEventListener('mouseleave', eventRefs.current.mouseLeave);
			}
		};
	}, [container]);

	return (
		<div className={styles.imageWithHover}>
			<Image {...props} />
			{hoverShow &&
				typeof cardHover === 'function' &&
				cardHover(game, setHoverShow, shouldHideRef)}
		</div>
	);
}
export default ImageWithHover;
