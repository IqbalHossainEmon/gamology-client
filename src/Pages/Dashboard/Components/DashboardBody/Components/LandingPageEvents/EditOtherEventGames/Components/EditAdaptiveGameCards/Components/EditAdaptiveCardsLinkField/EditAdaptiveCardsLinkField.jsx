import TypeableSelectionField from '../../../../../../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import styles from './EditAdaptiveCardsLinkField.module.css';

function EditAdaptiveCardsLinkField({ index, link }) {
	return (
		<div className={styles.header}>
			<TypeableSelectionField
				htmlFor='addGameCard'
				placeholder='Search for a game'
				name='name'
				setState={val => {
					console.log(val);
				}}
				// errorMessage={errorMessage.current}
				// errorChange={errorChange}
			/>
		</div>
	);
}
export default EditAdaptiveCardsLinkField;
