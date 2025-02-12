import { useState } from 'react';
import useHandleTimerTransition from '../../../Utils/Hooks/useHandleTimerTransition';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import GameShowCasePositionButtonGroup from '../Components/GameShowCasePositionButtonGroup/GameShowCasePositionButtonGroup';
import GamesShowcaseColumn from '../Components/GamesShowcaseColumn/GamesShowcaseColumn/GamesShowcaseColumn';
import CardPositionControls from '../Components/StickyNavigationButtons/StickyNavigationButtons';
import styles from './GamesShowcase.module.css';

export default function GamesShowcase({ items, link, extraCard, dataRef, getHoverCard, dotMenu }) {
	const [cardPosition, setCardPosition] = useState(0);
	const [transition, setTransition] = useState({ transition: false });

	const { widthInRem } = useScreenWidth();

	const handleTransitionTimer = useHandleTimerTransition(setTransition);

	return (
		<section className={styles.container}>
			{widthInRem <= 48 && (
				<CardPositionControls
					setCardPosition={prop => {
						setCardPosition(prop);
						if (!transition.transition) setTransition({ transition: true });
						handleTransitionTimer();
					}}
				/>
			)}
			<div className={styles.gamesShowcaseContainer}>
				<ul
					className={`${styles.gamesShowcase}${transition.transition ? ` ${styles.transition}` : ''}`}
					{...(widthInRem < 48 && {
						style: { translate: `-${100 * cardPosition}%` },
					})}
				>
					{items.map((item, index) => (
						<GamesShowcaseColumn
							getHoverCard={getHoverCard}
							dotMenu={dotMenu}
							dataRef={dataRef}
							games={item.games}
							header={item.header}
							key={item.id}
							link={link}
							index={index}
							extraCard={extraCard}
							setHeader={val => {
								console.log(val);
							}}
						/>
					))}
				</ul>
			</div>
			{widthInRem <= 48 && (
				<GameShowCasePositionButtonGroup
					cardPosition={cardPosition}
					length={items.length}
					setCardPosition={prop => {
						setCardPosition(prop);
						if (!transition.transition) setTransition({ transition: true });
						handleTransitionTimer();
					}}
				/>
			)}
		</section>
	);
}
