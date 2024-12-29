import { useRef } from 'react';
import Image from '../../../../../../../../Shared/Image/Image/Image';
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
				<Image
					data={profileImage}
					alt={`${firstName}${middleName ? ` ${middleName}` : ''} ${lastName}`}
					aspectRatioClassName={styles.aspectRatioClassName}
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
