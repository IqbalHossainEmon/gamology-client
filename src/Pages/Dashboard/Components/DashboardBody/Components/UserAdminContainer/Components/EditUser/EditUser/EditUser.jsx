import { useEffect, useState } from 'react';

import EditUserBody from '../Components/EditUserBody/EditUserBody/EditUserBody';
import EditUserHeader from '../Components/EditUserHeader/EditUserHeader';
import EditUserLoading from '../Components/EditUserLoading/EditUserLoading';

import styles from './EditUser.module.css';

const usr = {
	id: 1,
	name: { firstName: 'Iqbal', middleName: 'Hossain', lastName: 'Emon' },
	email: 'iqbalhossainemon2@gmail.com',
	role: 'user',
	displayName: 'IqbalHossainEmon',
	profileImage: 'https://avatars.githubusercontent.com/u/49958188?v=4',
};

function EditUser() {
	const [user, setUser] = useState({});

	useEffect(() => {
		setUser(usr);
	}, []);

	return (
		<div className={styles.editUser}>
			{user.name ? (
				<>
					<EditUserHeader name={user.name} />
					<EditUserBody user={user} setUser={setUser} />
				</>
			) : (
				<EditUserLoading />
			)}
		</div>
	);
}
export default EditUser;
