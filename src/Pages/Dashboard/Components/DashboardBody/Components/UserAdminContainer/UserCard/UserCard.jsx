import styles from './UserCard.module.css';

const UserCard = ({ data }) => {
    const { img, name } = data;
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardContainerImg}>
                <img src={img} alt={name} />
            </div>
            <div className={styles.cardContainerName}>
                <h4>{name}</h4>
            </div>
        </div>
    );
};
export default UserCard;
