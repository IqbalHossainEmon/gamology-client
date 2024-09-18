import { useRef } from 'react';
import styles from './UserCard.module.css';

function UserCard({ data, children }) {
	const containerRef = useRef(null);
	const { profileImage, name, email } = data;
	const { firstName, lastName, middleName } = name;
	return (
		<div className={styles.cardContainer} ref={containerRef}>
			<div className={styles.cardContainerImg}>
				<img
					src={profileImage}
					alt={`${firstName}${middleName ? ` ${middleName}` : ''} ${lastName}`}
				/>
			</div>
			<div className={styles.cardContainerInfo}>
				<h3>
					{firstName} {middleName} {lastName}
				</h3>
				<p>{email}</p>
			</div>
			{children(containerRef)}
		</div>
	);
}
export default UserCard;
