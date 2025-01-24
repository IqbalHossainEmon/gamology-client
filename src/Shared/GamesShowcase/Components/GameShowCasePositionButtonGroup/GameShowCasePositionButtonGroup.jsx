import styles from './GameShowCasePositionButtonGroup.module.css';

export default function GameShowCasePositionButtonGroup({ setCardPosition, cardPosition, length }) {
	return (
		<div className={styles.positionButtonGroup}>
			{[...Array(length).keys()].map(button => (
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
