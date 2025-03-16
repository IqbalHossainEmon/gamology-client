import SelectionField from '../../../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import styles from './EditAdaptiveGameFooterBody.module.css';

function EditAdaptiveGameFooterBody({ index, data }) {
	return (
		<>
			<p className={styles.editFooterHeader}>Edit the footer of card {index + 1}?</p>
			<div>
				<SelectionField
					htmlFor='number-of-buttons'
					list={[1, 2, 'Price']}
					name='Number of Buttons'
					defaultValue={data.footer ? data.footer.length : 'None'}
					none
					placeholder='Select Number of Buttons'
					setState={(val, name) => console.log(val, name)}
				/>
			</div>
		</>
	);
}
export default EditAdaptiveGameFooterBody;
