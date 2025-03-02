import TextField from '../../../../../../../../../../../Shared/TextField/TextField/TextField';
import styles from './EditAdaptiveCardsLinkField.module.css';

function EditAdaptiveCardsLinkField({ index, link }) {
	return (
		<div className={styles.header}>
			<TextField
				field='input'
				placeholder='Link for the Card'
				setState={value => console.log(value)}
				htmlFor={`header${index}`}
				defaultValue={link}
			/>
		</div>
	);
}
export default EditAdaptiveCardsLinkField;
