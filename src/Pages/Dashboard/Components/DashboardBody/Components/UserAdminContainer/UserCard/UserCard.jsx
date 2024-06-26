import styles from './UserCard.module.css';

const UserCard = ({ data, children, className }) => {
    const { img, name, email } = data;
    return (
        <div className={`${styles.cardContainer}${className ? ` ${className}` : ''}`}>
            <div className={styles.cardContainerImg}>
                <img src={img} alt={name} />
            </div>
            <div className={styles.cardContainerInfo}>
                <h4>{name}</h4>
                <p>{email}</p>
            </div>
            {children && children}
        </div>
    );
};
export default UserCard;
