import ButtonWithRipple from '../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import styles from './EditAdaptiveGameCardsButtons.module.css';

function EditAdaptiveGameCardsButtons() {
	return (
		<div className={styles.editAdaptiveGameCardsButtons}>
			<ButtonWithRipple>Add Title</ButtonWithRipple>
			<ButtonWithRipple>Add Description</ButtonWithRipple>
			<ButtonWithRipple>Add Footer Button</ButtonWithRipple>
		</div>
	);
}
export default EditAdaptiveGameCardsButtons;
