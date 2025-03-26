import { useEffect, useRef, useState } from 'react';
import useHandleTimerTransition from '../../../Utils/Hooks/useHandleTimerTransition';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import AdaptiveCard from '../Components/AdaptiveCard/AdaptiveCard';
import AdaptiveCardNavigator from '../Components/AdaptiveCardNavigator/AdaptiveCardNavigator';
import styles from './AdaptiveCards.module.css';

function AdaptiveCards({
	items,
	isEditing,
	editingHeader,
	onImageUpload,
	onFieldChange,
	index = 0,
	cardHover = null,
	handleEditFooter,
}) {
	const [cardPosition, setCardPosition] = useState(0);
	const [transition, setTransition] = useState({ transition: false });

	const { widthInRem } = useScreenWidth();

	const handleTransition = useHandleTimerTransition(setTransition, 300);

	const cardPositionRef = useRef(cardPosition);
	cardPositionRef.current = cardPosition;

	useEffect(() => {
		if (cardPositionRef.current >= items.length) {
			setCardPosition(items.length - 1);
		}
	}, [items]);

	return (
		<section className={styles.adaptiveGameCards}>
			<div className={styles.adaptiveGameCardsContainer}>
				<ul
					className={`${styles.adaptiveGameCardsList}${transition.transition ? ` ${styles.transition}` : ''}`}
					{...(widthInRem <= 48 && {
						style: {
							translate: `calc(-${100 * cardPosition}% - ${cardPosition} * 1rem)`,
						},
					})}
				>
					{items.map((item, i) => (
						<AdaptiveCard
							htmlFor={`${index}${i}`}
							isEditing={isEditing}
							key={item.link}
							data={item}
							innerIndex={i}
							length={items.length}
							parentIndex={index}
							editingHeader={editingHeader}
							onFieldChange={(field, value) => onFieldChange(value, field, i)}
							onImageUpload={data => onImageUpload(data, i)}
							cardHover={cardHover}
							handleEditFooter={handleEditFooter}
						/>
					))}
				</ul>
			</div>
			{widthInRem < 48.0625 && items.length > 1 && (
				<AdaptiveCardNavigator
					length={items.length}
					setCardPosition={prop => {
						setCardPosition(prop);
						if (!transition.transition) setTransition({ transition: true });
						handleTransition();
					}}
					cardPosition={cardPosition}
				/>
			)}
		</section>
	);
}
export default AdaptiveCards;
