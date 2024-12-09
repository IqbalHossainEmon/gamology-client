import ArrowButton from '../../../../../../../../Shared/ArrowButton/ArrowButton';
import styles from './StickyChangeButtons.module.css';

function StickyChangeButtons({ setCardPosition }) {
	return (
		<div className={styles.arrowBtn}>
			<ArrowButton
				className={styles.prevBtn}
				handleClick={() => setCardPosition(prev => (prev - 1 + 3) % 3)}
				name='Next Button'
			/>
			<ArrowButton
				className={styles.nextBtn}
				handleClick={() => setCardPosition(prev => (prev + 1) % 3)}
				name='Next Button'
			/>
		</div>
	);
}
export default StickyChangeButtons;
