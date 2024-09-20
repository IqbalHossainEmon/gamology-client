import { useRef, useState } from 'react';
import useObjectUtilities from '../../../../../../../../../../../Hooks/useObjectUtilities';
import useToast from '../../../../../../../../../../../Hooks/useToast';
import ButtonWaterEffect from '../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import ProfilePhotoUploader from '../../../../../../../../../../../Shared/ProfilePhotoUploader/ProfilePhotoUploader';
import OuterErrorMessage from '../../../../../../../Shared/OuterErrorMessage/OuterErrorMessage';
import useDashboardModal from '../../../../../../useDashboardModal/useDashboardModal';
import UserDeleteConfirmModal from '../../../../../UserContainer/Components/UserDeleteConfirmModal/UserDeleteConfirmModal';
import UserMakeAdminModal from '../../../../../UserContainer/Components/UserMakeAdminModal/UserMakeAdminModal';
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

	const { setDashboardModalContent, setDashboardModal } = useDashboardModal();
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
					setDashboardModalContent({
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
					setDashboardModal(true);
					return;
				}
				eventRefs.current.handleBackEndRequest();
			},
			handleDelete: () => {
				setDashboardModalContent({
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
							data={{ name: userData.current.name.lastName }}
							handleRemove={() => {
								console.log('delete user');
							}}
						/>
					),
				});
				setDashboardModal(true);
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
				onClick={eventRefs.current.handleDelete}
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
