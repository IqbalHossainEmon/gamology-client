import { useRef, useState } from 'react';
import useAnimationFrame from '../../../../../../../../../../Utils/Hooks/useAnimationFrame';
import styles from './DiscoverBannerItemCardShadow.module.css';

function DiscoverBannerItemCardShadow({ isPause }) {
	const [translate, setTranslate] = useState(0);

	const translateRef = useRef(translate);
	translateRef.current = translate;

	useAnimationFrame(progress => setTranslate(progress * 100), 7600, isPause);

	return (
		<div className={styles.shadowContainer}>
			<div
				className={styles.shadow}
				style={{
					transform: `translateY(${translate}%)`,
				}}
			/>
		</div>
	);
}

export default DiscoverBannerItemCardShadow;
