import UserCard from '../../UserCard/UserCard';
import styles from './UserContainer.module.css';

const UserContainer = () => {
    const userDetail = {
        img: '/assets/images/user-1.png',
        name: 'John Doe',
    };
    return (
        <div className={styles.userContainer}>
            <UserCard data={userDetail} />
        </div>
    );
};
export default UserContainer;
