import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import ProfilePhotoUploader from '../../../../../../../../../../../Shared/ProfilePhotoUploader/ProfilePhotoUploader';
import EditUserBodyTextFields from '../Components/EditUserBodyTextFields/EditUserBodyTextFields';
import styles from './EditUserBody.module.css';

function EditUserBody({ user }) {
	const userData = useRef({ ...user });

	const eventRefs = useRef(null);

	if (eventRefs.current === null) {
		eventRefs.current = {
			setPhoto: photo => {
				userData.current.profileImage = photo;
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
			/>
			<button ref={saveBtnRef} type='button' className={`${styles.btn} ${styles.saveButton}`}>
				Save
				<ButtonWaterEffect btnRef={saveBtnRef} />
			</button>
			<h3 className={styles.subHeader}>Delete User</h3>
			<button
				ref={deleteBtnRef}
				type='button'
				className={`${styles.btn} ${styles.deleteButton}`}
			>
				Delete User
				<ButtonWaterEffect btnRef={deleteBtnRef} />
			</button>
		</div>
	);
}
export default EditUserBody;
