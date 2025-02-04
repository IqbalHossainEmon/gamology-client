import { useRef } from 'react';
import ImageWithHover from '../../../../../../../../Shared/ImageWithHover/ImageWithHover';
import styles from './UserCard.module.css';

function UserCard({ data, children, admin }) {
	const containerRef = useRef(null);
	const { profileImage, name, email } = data;
	const { firstName, lastName, middleName } = name;
	return (
		<div
			className={`${styles.cardContainer}${admin ? ` ${styles.admin}` : ''}`}
			ref={containerRef}
		>
			<div className={styles.cardContainerImg}>
				<ImageWithHover
					cardHover={children(containerRef)}
					data={profileImage}
					alt={`${firstName}${middleName ? ` ${middleName}` : ''} ${lastName}`}
					aspectRatio={1}
				/>
			</div>
			<div className={styles.cardContainerInfo}>
				<h3>
					{firstName} {middleName} {lastName}
				</h3>
				<p>{email}</p>
			</div>
		</div>
	);
}
export default UserCard;
