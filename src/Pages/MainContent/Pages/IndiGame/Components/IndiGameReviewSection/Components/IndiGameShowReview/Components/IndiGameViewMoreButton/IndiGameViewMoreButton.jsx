import ButtonWaterEffect from '../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './IndiGameViewMoreButton.module.css';

export default function IndiGameViewMoreButton({ handleChange }) {
	return (
		<div className={styles.individualGameViewMoreButton}>
			<button onClick={() => handleChange({ type: 'viewMore' })} type='button'>
				View More &rarr;
				<ButtonWaterEffect />
			</button>
		</div>
	);
}
