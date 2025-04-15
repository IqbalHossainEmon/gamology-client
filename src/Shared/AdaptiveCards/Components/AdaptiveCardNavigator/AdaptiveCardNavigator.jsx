import ArrowButton from '../../../ArrowButton/ArrowButton';

import styles from './AdaptiveCardNavigator.module.css';

function AdaptiveCardNavigator({ setCardPosition, cardPosition, length }) {
	return (
		<div className={styles.mixEventChangeMainButtonContainer}>
			<ArrowButton
				className={styles.prevBtn}
				handleClick={() => setCardPosition(prev => (prev + 1) % length)}
				name='Next Button'
			/>
			<div className={styles.mixEventChangeMidButton}>
				{[...Array(length).keys()].map(button => (
					<button
						key={button}
						className={`${styles.btn}${cardPosition === button ? ` ${styles.active}` : ''}`}
						onClick={() => setCardPosition(button)}
						type='button'
					/>
				))}
			</div>
			<ArrowButton
				className={styles.nextBtn}
				handleClick={() => setCardPosition(prev => (prev + 1) % length)}
				name='Next Button'
			/>
		</div>
	);
}
export default AdaptiveCardNavigator;
