import { useState } from 'react';
import useHandleTimerTransition from '../../../Utils/Hooks/useHandleTimerTransition';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import DynamicCardNavigator from '../Components/DynamicCardNavigator/DynamicCardNavigator';
import DynamicGameCard from '../Components/DynamicGameCard/DynamicGameCard';
import styles from './DynamicGameCards.module.css';

function DynamicGameCards({ items, link }) {
	const [cardPosition, setCardPosition] = useState(0);
	const [transition, setTransition] = useState({ transition: false });

	const { widthInRem } = useScreenWidth();

	const handleTransition = useHandleTimerTransition(setTransition, 300);

	return (
		<section className={styles.dynamicGameCards}>
			<div className={styles.dynamicGameCardsContainer}>
				<ul
					className={`${styles.dynamicGameCardsList}${transition.transition ? ` ${styles.transition}` : ''}`}
					{...(widthInRem < 48 && {
						style: {
							translate: `calc(-${100 * cardPosition}% - ${cardPosition * 1.5} * 1rem)`,
						},
					})}
				>
					{items.map(item => (
						<DynamicGameCard
							key={item.id}
							data={item}
							isOnlyOne={items.length === 1}
							link={link}
						/>
					))}
				</ul>
			</div>
			{widthInRem < 48.0625 && items.length > 1 && (
				<DynamicCardNavigator
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
export default DynamicGameCards;
