import SelectionField from '../../../../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import TextField from '../../../../../../../../../../../../Shared/TextField/TextField/TextField';
import styles from './EditUserBodyTextFields.module.css';

function EditUserBodyTextFields({ setState, user, errorMessages, errorChange }) {
	return (
		<>
			<h4 className={styles.subHeader}>Personal Details</h4>
			<div className={styles.fieldContainer}>
				<TextField
					errorChange={errorChange}
					errorMessage={errorMessages.name.firstName}
					className={styles.textField}
					placeholder='First Name'
					field='input'
					defaultValue={user.name.firstName}
					htmlFor='firstName'
					setState={setState}
					propertyName='firstName'
				/>
				<TextField
					className={styles.textField}
					placeholder='Middle Name (Optional)'
					field='input'
					{...(user.name.middleName && { defaultValue: user.name.middleName })}
					htmlFor='middleName'
					setState={setState}
					propertyName='middleName'
				/>
				<TextField
					errorChange={errorChange}
					errorMessage={errorMessages.name.lastName}
					className={styles.textField}
					placeholder='Last Name'
					field='input'
					defaultValue={user.name.lastName}
					htmlFor='lastName'
					setState={setState}
					propertyName='lastName'
				/>
			</div>
			<h4 className={styles.subHeader}>Account Information</h4>
			<div className={styles.fieldContainer}>
				<TextField
					errorChange={errorChange}
					errorMessage={errorMessages.displayName}
					className={styles.textField}
					placeholder='Display Name'
					field='input'
					defaultValue={user.displayName}
					htmlFor='displayName'
					setState={setState}
					propertyName='displayName'
				/>
				<TextField
					errorChange={errorChange}
					errorMessage={errorMessages.email}
					className={styles.textField}
					placeholder='Email'
					field='input'
					defaultValue={user.email}
					htmlFor='email'
					setState={setState}
					propertyName='email'
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
					propertyName='addressLine1'
				/>
				<TextField
					className={styles.addressTextField}
					placeholder='Address Line 2 (Optional)'
					field='input'
					htmlFor='address_line2'
					setState={setState}
					propertyName='addressLine2'
				/>
				<TextField
					className={styles.textField}
					placeholder='City'
					field='input'
					htmlFor='city'
					setState={setState}
					propertyName='city'
				/>
				<TextField
					className={styles.textField}
					placeholder='Region'
					field='input'
					htmlFor='region'
					setState={setState}
					propertyName='region'
				/>
			</div>
			<h4 className={styles.subHeader}>Role</h4>
			<div className={styles.roleFieldContainer}>
				<SelectionField
					className={styles.textField}
					placeholder='Role'
					setState={setState}
					list={['User', 'Admin']}
					defaultValue='User'
					propertyName='role'
				/>
			</div>
		</>
	);
}
export default EditUserBodyTextFields;
