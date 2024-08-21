import ArrowButton from '../../../../../../../../Shared/ArrowButton/ArrowButton';
import styles from './DiscoverGamesButtons.module.css';

export default function DiscoverGamesButton({ handleClick, cardActive, length }) {
	return (
		<div className={styles.Buttons}>
			<ArrowButton
				className={[styles.btn, styles.nextBtn].join(' ')}
				enable={cardActive === 0}
				handleClick={() => handleClick('prev')}
				name="Previous Button"
			/>

			<ArrowButton
				className={[styles.btn, styles.prevBtn].join(' ')}
				enable={length === -cardActive}
				handleClick={() => handleClick('next')}
				name="Next Button"
			/>
		</div>
	);
}
