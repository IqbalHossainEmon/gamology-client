import styles from './ChangeEventButtons.module.css';

const buttons = [0, 1, 2];

export default function ChangeEventButtons({ setCardPosition, cardPosition }) {
	return (
		<div className={styles.changeEventButtons}>
			{buttons.map(button => (
				<button
					key={button}
					className={`${styles.button}${cardPosition === button ? ` ${styles.active}` : ''}`}
					onClick={() => setCardPosition(button)}
					type='button'
				/>
			))}
		</div>
	);
}
