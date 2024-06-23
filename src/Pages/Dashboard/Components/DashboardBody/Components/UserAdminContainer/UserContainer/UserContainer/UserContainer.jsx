import { useEffect, useState } from 'react';
import UserCard from '../UserCard/UserCard';
import styles from './UserContainer.module.css';

const userDetail = [];
for (let i = 0; i < 100; i++) {
    const user = {
        id: i,
        img: '/assets/images/user-1.png',
        name: `User ${i}`,
        email: `user${i}@example.com`,
    };
    userDetail.push(user);
}

const UserContainer = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(userDetail);
    }, []);

    return (
        <div className={styles.userContainer}>
            {users.map(user => (
                <UserCard key={user.id} data={user} />
            ))}
        </div>
    );
};
export default UserContainer;
