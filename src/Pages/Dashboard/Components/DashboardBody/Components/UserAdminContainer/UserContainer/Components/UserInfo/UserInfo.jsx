import styles from './UserInfo.module.css';

function UserInfo({ user }) {
	return (
		<div className={styles.imgContainer}>
			<img alt={user.name.lastName} src={user.profileImage} />
		</div>
	);
}
export default UserInfo;
