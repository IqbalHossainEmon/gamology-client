import ArrowButton from '../../../ArrowButton/ArrowButton';
import styles from './GameCardsButtons.module.css';

export default function GameCardsButtons({ handleClick, cardActive, length }) {
	return (
		<div className={styles.Buttons}>
			<ArrowButton
				className={`${styles.btn} ${styles.nextBtn}`}
				enable={cardActive === 0}
				handleClick={() => handleClick('prev')}
				name='Previous Button'
			/>
			<ArrowButton
				className={`${styles.btn} ${styles.prevBtn}`}
				enable={length === cardActive}
				handleClick={() => handleClick('next')}
				name='Next Button'
			/>
		</div>
	);
}
