import { useEffect, useState } from 'react';
import CardDot from '../../../../Shared/CardDot/CardDot';
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

const UserContainer = ({ setModal }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(userDetail);
    }, []);

    return (
        <div className={styles.userContainer}>
            {users.map(user => (
                <UserCard key={user.id} data={user}>
                    <CardDot
                        className={styles.cardDots}
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
                                name: 'Price',
                                event: detail => {
                                    // setModal({
                                    //     show: true,
                                    //     title: 'Edit Price',
                                    //     modalQuestion: (
                                    //         <>
                                    //             What price($) you want to set for <span className={styles.nameContainer}>{item.name}</span>
                                    //         </>
                                    //     ),
                                    //     ModalBody: props => modalBody(props, 'price', detail),
                                    // });
                                    console.log('Price');
                                },
                            },
                            {
                                id: 3,
                                name: 'Delete',
                                event: detail => {
                                    setModal({
                                        show: true,
                                        title: 'Delete Game',
                                        modalQuestion: (
                                            <>
                                                Are you sure you want to delete <span className={styles.nameContainer}>{user.name}</span>?
                                            </>
                                        ),
                                        ModalBody: props => {
                                            // modalBody(props, 'delete', detail);
                                            console.log('Delete');
                                        },
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
