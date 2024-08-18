import { useEffect, useRef, useState } from 'react';
import styles from './ReviewStar.module.css';

const emptyStar = 'assets/images/icons/star-empty.png';
const fullStar = 'assets/images/icons/star-full.png';

export default function ReviewStar({ setValue = () => {}, disabled, newValue = 0, name }) {
	const [star, setStar] = useState({ active: newValue, show: newValue });

	useEffect(() => {
		setStar({ active: newValue, show: newValue });
	}, [newValue]);

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleMouseOver: index => {
				setStar(prev => ({ ...prev, show: index }));
			},
			handleClick: active => {
				setStar(prev => ({ ...prev, [name]: active }));
				setValue(prev => ({ ...prev, [name]: active }));
			},
		};
	}

	return (
		<div
			onMouseLeave={() => setStar(prev => ({ ...prev, show: prev.active }))}
			className={styles.reviewStar}
		>
			{[0, 1, 2, 3, 4].map((s, i) => (
				<button
					className={styles.starButton}
					type='button'
					key={s}
					{...(disabled && { disabled: true })}
					{...(disabled || {
						onMouseOver: () => eventRefs.current.handleMouseOver(i),
						onFocus: () => eventRefs.current.handleMouseOver(i),
						onClick: () => eventRefs.current.handleClick(i),
					})}
				>
					<img draggable='false' src={star.show >= i ? fullStar : emptyStar} alt='' />
				</button>
			))}
		</div>
	);
}
