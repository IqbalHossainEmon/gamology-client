import { useRef } from 'react';
import ProfilePhotoUploader from '../../../../../../../../../Shared/ProfilePhotoUploader/ProfilePhotoUploader';
import EditUserHeader from '../Components/EditUserHeader/EditUserHeader';
import styles from './EditUser.module.css';

const user = {
	id: 1,
	name: { firstName: 'Iqbal', middleName: 'Hossain', lastName: 'Emon' },
	email: 'iqbalhossainemon2@gmail.com',
	role: 'user',
	profileImage: 'https://avatars.githubusercontent.com/u/49958188?v=4',
};

function EditUser() {
	const userData = useRef({
		name: { firstName: '', middleName: '', lastName: '' },
		email: '',
		role: '',
		profileImage: '',
	});

	const eventRefs = useRef(null);

	if (eventRefs.current === null) {
		eventRefs.current = {
			setPhoto: photo => {
				userData.current.profileImage = photo;
			},
		};
	}

	return (
		<div className={styles.editUser}>
			<EditUserHeader name={user.name} />
			<ProfilePhotoUploader data={user.profileImage} setPhoto={eventRefs.current.setPhoto} />
		</div>
	);
}
export default EditUser;
