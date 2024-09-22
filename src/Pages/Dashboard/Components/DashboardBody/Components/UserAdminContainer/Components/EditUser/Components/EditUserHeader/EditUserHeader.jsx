import styles from './EditUserHeader.module.css';

function EditUserHeader({ name }) {
	const { firstName, middleName, lastName } = name;
	return (
		<h2 className={styles.header}>
			Edit User{' '}
			<span className={styles.name}>
				({`${firstName} ${middleName ? `${middleName} ${lastName}` : lastName}`})
			</span>
		</h2>
	);
}
export default EditUserHeader;
