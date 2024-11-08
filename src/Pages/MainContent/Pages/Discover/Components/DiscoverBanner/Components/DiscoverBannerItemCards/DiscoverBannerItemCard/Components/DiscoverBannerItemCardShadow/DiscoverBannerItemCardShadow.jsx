import { useState } from 'react';
import useAnimationFrame from '../../../../../../../../../../../Utils/Hooks/useAnimationFrame';
import styles from './DiscoverBannerItemCardShadow.module.css';

function DiscoverBannerItemCardShadow({ cardShadowUtils }) {
	const [translate, setTranslate] = useState(0);

	const { isPause, dispatch } = cardShadowUtils;

	useAnimationFrame(progress => setTranslate(progress * 100), 8500, isPause, dispatch);

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
