import { useState } from 'react';
import useHandleTimerTransition from '../../../Utils/Hooks/useHandleTimerTransition';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import AdaptiveGameCard from '../Components/AdaptiveGameCard/AdaptiveGameCard';
import AdaptiveGameCardNavigator from '../Components/AdaptiveGameCardNavigator/AdaptiveGameCardNavigator';
import styles from './AdaptiveGameCards.module.css';

function AdaptiveGameCards({ items, link, isEditing }) {
	const [cardPosition, setCardPosition] = useState(0);
	const [transition, setTransition] = useState({ transition: false });

	const { widthInRem } = useScreenWidth();

	const handleTransition = useHandleTimerTransition(setTransition, 300);

	return (
		<section className={styles.adaptiveGameCards}>
			<div className={styles.adaptiveGameCardsContainer}>
				<ul
					className={`${styles.adaptiveGameCardsList}${transition.transition ? ` ${styles.transition}` : ''}`}
					{...(widthInRem < 48 && {
						style: {
							translate: `calc(-${100 * cardPosition}% - ${cardPosition * 1.5} * 1rem)`,
						},
					})}
				>
					{items.map(item => (
						<AdaptiveGameCard
							isEditing={isEditing}
							key={item.id}
							data={item}
							isOnlyOne={items.length === 1}
							link={link}
						/>
					))}
				</ul>
			</div>
			{widthInRem < 48.0625 && items.length > 1 && (
				<AdaptiveGameCardNavigator
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
export default AdaptiveGameCards;
