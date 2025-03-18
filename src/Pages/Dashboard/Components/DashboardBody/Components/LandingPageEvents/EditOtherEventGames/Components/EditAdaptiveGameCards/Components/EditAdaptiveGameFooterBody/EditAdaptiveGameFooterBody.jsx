import styles from './EditAdaptiveGameFooterBody.module.css';

function EditAdaptiveGameFooterBody({ index }) {
	return <p className={styles.editFooterHeader}>Edit the footer of card {index + 1}?</p>;
}
export default EditAdaptiveGameFooterBody;
