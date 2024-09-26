import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../../../../../Utils/Hooks/useAppearDisappear';
import DiscoverBannerItemCardShadow from '../DiscoverBannerItemCardShadow/DiscoverBannerItemCardShadow';
import styles from './CardNameContainer.module.css';

function CardNameContainer({ state, name, cardShadowUtils }) {
	const [show, fadeIn] = useAppearDisappear(state, true);
	const timerId = useRef(null);
	const [showShadow, setShowShadow] = useState(false);

	useEffect(() => {
		if (show) {
			if (timerId.current) {
				clearTimeout(timerId.current);
				timerId.current = null;
			}
			timerId.current = setTimeout(() => {
				timerId.current = null;
				setShowShadow(true);
			}, 700);
		} else {
			if (timerId.current) {
				clearTimeout(timerId.current);
				timerId.current = null;
			}
			setShowShadow(false);
		}
	}, [show]);

	return (
		show && (
			<div className={styles.cardNameContainer}>
				<div className={`${styles.cardName}${fadeIn ? ` ${styles.fadeIn}` : ''}`}>
					<p className={styles.cardNameText}>{name}</p>
					{showShadow ? (
						<DiscoverBannerItemCardShadow cardShadowUtils={cardShadowUtils} />
					) : null}
				</div>
			</div>
		)
	);
}
export default CardNameContainer;
