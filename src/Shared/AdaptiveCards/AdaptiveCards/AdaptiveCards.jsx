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
	handleResetRef: resetRef,
}) {
	const [cardPosition, setCardPosition] = useState(0);
	const [transition, setTransition] = useState({ transition: false });

	const { widthInRem } = useScreenWidth();

	const handleTransition = useHandleTimerTransition(setTransition, 300);

	const cardPositionRef = useRef(cardPosition);
	cardPositionRef.current = cardPosition;
	const handleResetRef = useRef([]);

	useEffect(() => {
		if (cardPositionRef.current >= items.length) {
			setCardPosition(items.length - 1);
		}
	}, [items]);

	useEffect(() => {
		if (resetRef) {
			resetRef.current = target => {
				const fns = handleResetRef.current;
				if (!Array.isArray(fns) || fns.length === 0) return;

				if (!target) {
					fns.forEach(fn => fn?.());
					return;
				}

				if (typeof target === 'number') {
					if (Number.isInteger(target) && target >= 0 && target < fns.length) {
						fns[target]?.();
					}
					return;
				}

				if (Array.isArray(target)) {
					const unique = new Set(
						target.filter(idx => Number.isInteger(idx) && idx >= 0 && idx < fns.length)
					);
					unique.forEach(idx => fns[idx]?.());
				}
			};
		}
	}, [resetRef]);

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
							{...(resetRef && { handleResetRef })}
							htmlFor={`${index}${i}`}
							isEditing={isEditing}
							key={item.id}
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
