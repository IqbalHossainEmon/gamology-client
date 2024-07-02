import { useCallback, useEffect, useState } from 'react';
import CardDot from '../../../../Shared/CardDot/CardDot';
import UserCard from '../../UserCard/UserCard';
import UserDeleteModalBody from '../UserDeleteModalBody/UserDeleteModalBody';
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

const UserContainer = ({ setModal }) => {
    const [users, setUsers] = useState([]);

    const modalBody = useCallback((props, type, item) => <UserDeleteModalBody {...props} type={type} detail={item} />, []);

    useEffect(() => {
        setUsers(userDetail);
    }, []);

    return (
        <div className={styles.userContainer}>
            {users.map(user => (
                <UserCard className={styles.list} key={user.id} data={user}>
                    <CardDot
                        hoverClassName={styles.dots}
                        setModal={setModal}
                        item={user}
                        lists={[
                            {
                                id: 1,
                                name: 'Edit',
                                event: () => console.log('Edit'),
                            },
                            {
                                id: 2,
                                name: 'Delete',
                                event: detail => {
                                    setModal({
                                        show: true,
                                        title: 'Delete User',
                                        modalQuestion: (
                                            <div>
                                                <p>
                                                    Are you sure you want to delete{' '}
                                                    <span className={styles.nameContainer}>{user.name}</span>?
                                                </p>
                                                <div className={styles.imgContainer}>
                                                    <img src={user.img} alt={user.name} />
                                                </div>
                                            </div>
                                        ),
                                        ModalBody: props => modalBody(props, 'delete', detail),
                                    });
                                },
                            },
                            {
                                id: 3,
                                name: 'Make Admin',
                                event: detail => {
                                    setModal({
                                        show: true,
                                        title: 'Make Admin',
                                        modalQuestion: (
                                            <div>
                                                <p>
                                                    Are you sure you want to make <span className={styles.nameContainer}>{user.name}</span>{' '}
                                                    an admin?
                                                </p>
                                                <div className={styles.imgContainer}>
                                                    <img src={user.img} alt={user.name} />
                                                </div>
                                            </div>
                                        ),
                                        ModalBody: props => modalBody(props, 'makeAdmin', detail),
                                    });
                                },
                            },
                        ]}
                    />
                </UserCard>
            ))}
        </div>
    );
};
export default UserContainer;
