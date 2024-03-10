import styles from './NavProfileInfo.module.css';

export default function NavProfileInfo() {
  return (
    <div className={styles.profile}>
      <img className={styles.profileImg} src="/assets/images/user-1.png" alt="" />
      <p>iqbal.hossain.emon</p>
    </div>
  );
}
