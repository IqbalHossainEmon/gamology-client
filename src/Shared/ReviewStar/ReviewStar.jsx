import { useEffect, useRef, useState } from 'react';
import styles from './ReviewStar.module.css';

const emptyStar = 'assets/images/icons/star-empty.png',
 fullStar = 'assets/images/icons/star-full.png';

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
        className={styles.reviewStar}
        onMouseLeave={() => setStar(prev => ({ ...prev, show: prev.active }))}
    >
        {[0, 1, 2, 3, 4].map((s, i) => (
            <button
                className={styles.starButton}
                key={s}
                type='button'
                {...(disabled && { disabled: true })}
                {...(disabled || {
						onMouseOver: () => eventRefs.current.handleMouseOver(i),
						onFocus: () => eventRefs.current.handleMouseOver(i),
						onClick: () => eventRefs.current.handleClick(i),
					})}
            >
                <img
                    alt=''
                    draggable='false'
                    src={star.show >= i ? fullStar : emptyStar}
                />
            </button>
			))}
    </div>
	);
}
