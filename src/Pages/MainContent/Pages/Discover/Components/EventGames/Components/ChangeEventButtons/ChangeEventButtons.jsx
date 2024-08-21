import styles from './ChangeEventButtons.module.css';

const Buttons = [0, 1, 2];

export default function ChangeEventButtons({ setCardPosition, cardPosition }) {
	return (
		<div className={styles.ChangeEventButtons}>
			<div>
				{Buttons.map(Button => (
					<button
						key={Button}
						{...(cardPosition === Button && { id: styles.active })}
						className={[styles.button1, styles.button].join(' ')}
						onClick={() => setCardPosition(Button)}
						type="button"
					/>
				))}
			</div>
		</div>
	);
}
