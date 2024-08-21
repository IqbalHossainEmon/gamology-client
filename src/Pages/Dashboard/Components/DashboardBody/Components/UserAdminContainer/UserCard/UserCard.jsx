import { useRef } from 'react';
import styles from './UserCard.module.css';

function UserCard({ data, children }) {
	const containerRef = useRef(null);
	const { img, name, email } = data;
	return (
		<div className={styles.cardContainer} ref={containerRef}>
			<div className={styles.cardContainerImg}>
				<img alt={name} src={img} />
			</div>

			<div className={styles.cardContainerInfo}>
				<h4>{name}</h4>

				<p>{email}</p>
			</div>

			{children(containerRef)}
		</div>
	);
}
export default UserCard;
