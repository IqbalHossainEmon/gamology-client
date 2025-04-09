import ButtonWithRipple from '../../../../../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import styles from './EditAdaptiveGameFooterFooter.module.css';

function EditAdaptiveGameFooterFooter({ btnRef }) {
	return (
		<div className={styles.editFooterButtons}>
			<ButtonWithRipple btnRef={btnRef}>Save</ButtonWithRipple>
		</div>
	);
}
export default EditAdaptiveGameFooterFooter;
