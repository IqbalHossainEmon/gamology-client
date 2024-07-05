import { useRef } from 'react';
import styles from './UserCard.module.css';

const UserCard = ({ data, children }) => {
    const containerRef = useRef(null);

    const { img, name, email } = data;
    return (
        <div ref={containerRef} className={styles.cardContainer}>
            <div className={styles.cardContainerImg}>
                <img src={img} alt={name} />
            </div>
            <div className={styles.cardContainerInfo}>
                <h4>{name}</h4>
                <p>{email}</p>
            </div>
            {children(containerRef)}
        </div>
    );
};
export default UserCard;
