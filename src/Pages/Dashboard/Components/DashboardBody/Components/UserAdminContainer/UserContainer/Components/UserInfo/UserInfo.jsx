import styles from './UserInfo.module.css';

const UserInfo = ({ user }) => (
    <div className={styles.imgContainer}>
        <img src={user.img} alt={user.name} />
    </div>
);
export default UserInfo;
