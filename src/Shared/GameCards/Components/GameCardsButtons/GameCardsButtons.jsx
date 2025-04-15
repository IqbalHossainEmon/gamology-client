import ArrowButton from '../../../ArrowButton/ArrowButton';

import styles from './GameCardsButtons.module.css';

export default function GameCardsButtons({ handleClick, cardActive, length }) {
	return (
		<div className={styles.buttons}>
			<ArrowButton
				className={`${styles.btn} ${styles.nextBtn}`}
				disabled={cardActive === 0}
				handleClick={() => handleClick('prev')}
				name='Previous Button'
			/>
			<ArrowButton
				className={`${styles.btn} ${styles.prevBtn}`}
				disabled={length <= cardActive}
				handleClick={() => handleClick('next')}
				name='Next Button'
			/>
		</div>
	);
}
