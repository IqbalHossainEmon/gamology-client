import { useRef, useState } from 'react';
import useObjectUtilities from '../../../../../../../../../../../Hooks/useObjectUtilities';
import ButtonWaterEffect from '../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import ProfilePhotoUploader from '../../../../../../../../../../../Shared/ProfilePhotoUploader/ProfilePhotoUploader';
import OuterErrorMessage from '../../../../../../../Shared/OuterErrorMessage/OuterErrorMessage';
import EditUserBodyTextFields from '../Components/EditUserBodyTextFields/EditUserBodyTextFields';
import styles from './EditUserBody.module.css';

function EditUserBody({ user }) {
	const [errorChange, setErrorChange] = useState(0);

	const errorMessages = useRef({
		outerError: '',
		name: {
			firstName: '',
			lastName: '',
		},
		email: '',
		displayName: '',
	});

	const { areObjectsEqual, cloneObject } = useObjectUtilities();

	const userData = useRef(cloneObject(user));

	const eventRefs = useRef(null);

	if (eventRefs.current === null) {
		eventRefs.current = {
			setPhoto: photo => {
				userData.current.profileImage = photo;
			},
			handleValidation: () => {
				let error = false;
				if (areObjectsEqual(userData.current, user)) {
					errorMessages.current.outerError = 'No changes were made';
					error = true;
				} else {
					errorMessages.current.outerError = '';
				}
				if (!userData.current.name.firstName) {
					errorMessages.current.name.firstName = 'First Name is required';
					error = true;
				} else {
					errorMessages.current.name.firstName = '';
				}
				if (!userData.current.name.lastName) {
					errorMessages.current.name.lastName = 'Last Name is required';
					error = true;
				} else {
					errorMessages.current.name.lastName = '';
				}
				if (!userData.current.email) {
					errorMessages.current.email = 'Email is required';
					error = true;
				} else {
					errorMessages.current.email = '';
				}
				if (!userData.current.displayName) {
					errorMessages.current.displayName = 'Display Name is required';
					error = true;
				} else {
					errorMessages.current.displayName = '';
				}
				return error;
			},
			handleSaveChanges: () => {
				if (eventRefs.current.handleValidation()) {
					setErrorChange(prev => prev + 1);
					return;
				}
				// Save Changes
				console.log('Save Changes');
			},
		};
	}

	const saveBtnRef = useRef(null);
	const deleteBtnRef = useRef(null);

	return (
		<div className={styles.editUserBody}>
			<ProfilePhotoUploader data={user.profileImage} setPhoto={eventRefs.current.setPhoto} />
			<EditUserBodyTextFields
				user={userData.current}
				setState={(value, name) => {
					userData.current[name] = value;
				}}
				errorMessages={errorMessages.current}
				errorChange={errorChange}
			/>
			<button
				ref={saveBtnRef}
				type='button'
				onClick={eventRefs.current.handleSaveChanges}
				className={`${styles.btn} ${styles.saveButton}`}
			>
				Save Changes
				<ButtonWaterEffect btnRef={saveBtnRef} />
			</button>
			<OuterErrorMessage
				errorChange={errorChange}
				errorMessage={errorMessages.current.outerError}
			/>
			<h3 className={styles.subHeader}>Delete User</h3>
			<button
				ref={deleteBtnRef}
				type='button'
				className={`${styles.btn} ${styles.deleteButton}`}
			>
				Delete User Account
				<ButtonWaterEffect btnRef={deleteBtnRef} />
			</button>
		</div>
	);
}
export default EditUserBody;
