import ButtonWithRipple from '../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import styles from './EditAdaptiveGameFooterFooter.module.css';

function EditAdaptiveGameFooterFooter() {
	return (
		<div className={styles.editFooterButtons}>
			<ButtonWithRipple>Cancel</ButtonWithRipple>
			<ButtonWithRipple>Save</ButtonWithRipple>
		</div>
	);
}
export default EditAdaptiveGameFooterFooter;
