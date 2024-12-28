import Image from '../../../../../../../../../../Shared/Image/Image';
import CardNameContainer from '../Components/CardNameContainer/CardNameContainer';
import styles from './DiscoverBannerItemCard.module.css';

const handleCardPosition = num => {
	switch (num) {
		case 0:
			return styles.first;
		case 1:
			return styles.two;
		case 2:
			return styles.three;
		case 3:
			return styles.four;
		case 4:
			return styles.five;
		default:
			return '';
	}
};

const handleOnClickParam = num => {
	if (num > 2) {
		return 'prev';
	}
	if (num < 3) {
		return 'next';
	}
	return '';
};

export default function DiscoverBannerItemCard({
	banner,
	handleClick,
	cardsPosition,
	cardShadowUtils,
}) {
	const { carouselThumb, id, name } = banner;
	// This function takes card positions in the screen and returns a object where cards position styles and function is added as element

	const handleCardClick = () => {
		if (cardsPosition[id] === 2 || cardsPosition[id] === 3) {
			handleClick({ type: handleOnClickParam(cardsPosition[id]) });
			setTimeout(() => {
				handleClick({ type: handleOnClickParam(cardsPosition[id]) });
			}, 500);
		} else {
			handleClick({ type: handleOnClickParam(cardsPosition[id]) });
		}
	};

	return (
		<li className={`${styles.cards} hover-shadow`} id={handleCardPosition(cardsPosition[id])}>
			<button
				className={styles.cardBtn}
				type='button'
				{...(cardsPosition[id] !== 0 && { onClick: handleCardClick })}
			>
				<Image
					data={carouselThumb}
					alt={`${name} card-${id}`}
					aspectRatioClassName={styles.aspectRatioClassName}
				/>
			</button>
			<CardNameContainer
				cardShadowUtils={cardShadowUtils}
				name={name}
				state={cardsPosition[id] === 0}
			/>
		</li>
	);
}
