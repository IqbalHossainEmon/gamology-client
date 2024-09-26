import useHandleDebouncing from '../../../../../../../../Utils/Hooks/useHandleDebouncing';
import DiscoverBannerItemCard from '../DiscoverBannerItemCard/DiscoverBannerItemCard/DiscoverBannerItemCard';
import styles from './DiscoverBannerItemCards.module.css';

export default function DiscoverBannerItemCards({
	data,
	handleClick,
	cardsPosition,
	cardShadowUtils,
}) {
	const handleDebouncing = useHandleDebouncing(400);

	return (
		<ul className={styles.itemCards}>
			{data.map(({ id, carouselThumb, name }, index) => (
				<DiscoverBannerItemCard
					cardShadowUtils={cardShadowUtils}
					banner={{ carouselThumb, id: index, name }}
					cardsPosition={cardsPosition}
					handleClick={prop => handleDebouncing(() => handleClick(prop))}
					key={id}
				/>
			))}
		</ul>
	);
}
