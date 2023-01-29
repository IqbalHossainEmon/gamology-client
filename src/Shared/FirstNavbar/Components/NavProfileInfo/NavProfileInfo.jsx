import styles from './NavProfileInfo.module.css';

export default function NavProfileInfo() {
  return (
    <div className={styles.rightPart}>
      <img className={styles.profileImg} src="https://i.ibb.co/1TL02Bg/user-1.png" alt="" />
      <p>iqbal.hossain.emon</p>
    </div>
  );
}
