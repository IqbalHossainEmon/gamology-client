import ArrowButton from '../../../../../../../../Shared/ArrowButton/ArrowButton';
import styles from './ChangeEventButtons.module.css';

const Buttons = [0, 1, 2];

export default function ChangeEventButtons({ setCardPosition, cardPosition }) {
	return (
		<div className={styles.ChangeEventButtons}>
			<ArrowButton
				className={`${styles.prevBtn}`}
				handleClick={() => setCardPosition(prev => (prev - 1 + 3) % 3)}
				name='Next Button'
			/>
			<div className={styles.middleButton}>
				{Buttons.map(Button => (
					<button
						key={Button}
						{...(cardPosition === Button && { id: styles.active })}
						className={styles.button}
						onClick={() => setCardPosition(Button)}
						type='button'
					/>
				))}
			</div>
			<ArrowButton
				className={`${styles.nextBtn}`}
				handleClick={() => setCardPosition(prev => (prev + 1) % 3)}
				name='Next Button'
			/>
		</div>
	);
}
