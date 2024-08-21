import styles from './UserInfo.module.css';

function UserInfo({ user }) {
	return (
		<div className={styles.imgContainer}>
			<img alt={user.name} src={user.img} />
		</div>
	);
}
export default UserInfo;
