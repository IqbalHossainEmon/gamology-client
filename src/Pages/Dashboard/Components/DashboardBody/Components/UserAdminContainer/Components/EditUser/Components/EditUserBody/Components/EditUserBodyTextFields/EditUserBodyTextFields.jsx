import TextField from '../../../../../../../../../../../../Shared/TextField/TextField';
import styles from './EditUserBodyTextFields.module.css';

function EditUserBodyTextFields({ setState, user }) {
	return (
		<>
			<h4 className={styles.subHeader}>Personal Details</h4>
			<div className={styles.fieldContainer}>
				<TextField
					className={styles.textField}
					placeholder='First Name'
					field='input'
					defaultValue={user.name.firstName}
					htmlFor='firstName'
					setState={setState}
					name='firstName'
				/>
				<TextField
					className={styles.textField}
					placeholder='Middle Name (Optional)'
					field='input'
					{...(user.name.middleName && { defaultValue: user.name.middleName })}
					htmlFor='middleName'
					setState={setState}
					name='middleName'
				/>
				<TextField
					className={styles.textField}
					placeholder='Last Name'
					field='input'
					defaultValue={user.name.lastName}
					htmlFor='lastName'
					setState={setState}
					name='lastName'
				/>
			</div>
			<h4 className={styles.subHeader}>Account Information</h4>
			<div className={styles.fieldContainer}>
				<TextField
					className={styles.textField}
					placeholder='Display Name'
					field='input'
					defaultValue={user.displayName}
					htmlFor='displayName'
					setState={setState}
					name='displayName'
				/>
				<TextField
					className={styles.textField}
					placeholder='Email'
					field='input'
					defaultValue={user.email}
					htmlFor='email'
					setState={setState}
					name='email'
				/>
			</div>
			<h4 className={styles.subHeader}>Address</h4>
			<div className={styles.fieldContainer}>
				<TextField
					className={styles.addressTextField}
					placeholder='Address Line 1'
					field='input'
					htmlFor='address_line1'
					setState={setState}
					name='addressLine1'
				/>
				<TextField
					className={styles.addressTextField}
					placeholder='Address Line 2 (Optional)'
					field='input'
					htmlFor='address_line2'
					setState={setState}
					name='addressLine2'
				/>
				<TextField
					className={styles.textField}
					placeholder='City'
					field='input'
					htmlFor='city'
					setState={setState}
					name='city'
				/>
				<TextField
					className={styles.textField}
					placeholder='Region'
					field='input'
					htmlFor='region'
					setState={setState}
					name='region'
				/>
			</div>
		</>
	);
}
export default EditUserBodyTextFields;
