import styles from './EditAdaptiveGameCardsButtons.module.css';

function EditAdaptiveGameCardsButtons() {
	return (
		<div className={styles.editAdaptiveGameCardsButtons}>
			<button type='button'>Add Title</button>
			<button type='button'>Add Description</button>
			<button type='button'>Add Footer Button</button>
		</div>
	);
}
export default EditAdaptiveGameCardsButtons;
