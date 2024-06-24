import styles from './UserCard.module.css';

const UserCard = ({ data }) => {
    const { img, name, email } = data;
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardContainerImg}>
                <img src={img} alt={name} />
            </div>
            <div className={styles.cardContainerInfo}>
                <h4>{name}</h4>
                <p>{email}</p>
            </div>
        </div>
    );
};
export default UserCard;