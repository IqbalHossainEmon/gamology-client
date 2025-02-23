import { useRef, useState } from 'react';
import ProfilePhotoUploader from '../../../../../../../../../../../Shared/ProfilePhotoUploader/ProfilePhotoUploader';
import RippleEffect from '../../../../../../../../../../../Shared/RippleEffect/RippleEffect';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import useToast from '../../../../../../../../../../../Utils/Hooks/useToast';
import OuterErrorMessage from '../../../../../../../Shared/OuterErrorMessage/OuterErrorMessage';
import UserMakeAdminModal from '../../../../../Users/Components/UserMakeAdminModal/UserMakeAdminModal';
import UserDeleteConfirmModal from '../../../../UserDeleteConfirmModal/UserDeleteConfirmModal';
import EditUserBodyTextFields from '../Components/EditUserBodyTextFields/EditUserBodyTextFields';
import styles from './EditUserBody.module.css';

function EditUserBody({ user, setUser }) {
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

	const setModals = useModal();
	const { setToast } = useToast();

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
			handleBackEndRequest: () => {
				console.log('Request Sent');
				const check = true;
				if (check) {
					setUser(userData.current);
					setToast({
						title: 'User Updated',
						message: `${userData.current.name.lastName} has been updated successfully`,
						type: 'success',
					});
				}
			},
			handleSaveChanges: () => {
				if (eventRefs.current.handleValidation()) {
					setErrorChange(prev => prev + 1);
					errorMessages.current.wasOuterError = true;
					return;
				}
				if (errorMessages.current.wasOuterError) {
					setErrorChange(prev => prev + 1);
					delete errorMessages.current.wasOuterError;
				}
				// Save Changes
				if (userData.current.role === 'Admin') {
					setModals({
						title: 'Make Admin',
						body: (
							<p>
								Are you sure you want to make{' '}
								<span className={styles.boldName}>
									{userData.current.name.lastName}
								</span>{' '}
								an admin?
							</p>
						),
						footer: (
							<UserMakeAdminModal
								data={{ name: userData.current.name.lastName }}
								handleMakeAdmin={() => {
									console.log('Made Admin');
									eventRefs.current.handleBackEndRequest();
								}}
							/>
						),
					});
					return;
				}
				eventRefs.current.handleBackEndRequest();
			},
			handleDelete: () => {
				setModals({
					title: 'Delete User',
					body: (
						<p>
							Are you sure you want to Delete{' '}
							<span className={styles.boldName}>
								{userData.current.name.lastName}
							</span>
							&apos;s profile
						</p>
					),
					footer: (
						<UserDeleteConfirmModal
							btnText='Delete User'
							data={{ name: userData.current.name.lastName }}
							handleRemove={text => {
								if (text.toUpperCase() !== 'DELETE') {
									return true;
								}
								console.log('Deleted');
							}}
							placeholder='Type DELETE to confirm'
							errorMessage="Please type 'DELETE' to confirm"
						/>
					),
				});
				setModals(true);
			},
		};
	}

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
				type='button'
				onClick={eventRefs.current.handleSaveChanges}
				className={`${styles.btn} ${styles.saveButton}`}
			>
				Save Changes
				<RippleEffect />
			</button>
			<OuterErrorMessage
				errorChange={errorChange}
				errorMessage={errorMessages.current.outerError}
			/>
			<h3 className={styles.subHeader}>Delete User</h3>
			<button
				onClick={eventRefs.current.handleDelete}
				type='button'
				className={`${styles.btn} ${styles.deleteButton}`}
			>
				Delete User Account
				<RippleEffect />
			</button>
		</div>
	);
}
export default EditUserBody;
