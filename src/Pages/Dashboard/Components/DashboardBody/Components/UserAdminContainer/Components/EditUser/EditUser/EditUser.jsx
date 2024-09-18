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
	return (
		<div className={styles.editUser}>
			<EditUserHeader name={user.name} />
		</div>
	);
}
export default EditUser;
