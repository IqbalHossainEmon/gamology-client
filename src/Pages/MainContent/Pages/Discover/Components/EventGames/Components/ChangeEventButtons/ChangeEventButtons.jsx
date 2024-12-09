import styles from './ChangeEventButtons.module.css';

const Buttons = [0, 1, 2];

export default function ChangeEventButtons({ setCardPosition, cardPosition }) {
	return (
		<div className={styles.ChangeEventButtons}>
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
	);
}
