import styles from './NavProfileInfo.module.css';

export default function NavProfileInfo() {
	return (
		<div className={styles.profile}>
			<img alt='' className={styles.profileImg} src='/assets/images/user-1.png' />
			<p>iqbal.hossain.emon</p>
		</div>
	);
}
