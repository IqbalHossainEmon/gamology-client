import Image from '../../../../../../../../../Shared/Image/Image/Image';

import styles from './UserInfo.module.css';

function UserInfo({ user }) {
	return (
		<div className={styles.imgContainer}>
			<Image
				data={user.profileImage}
				alt={user.name.lastName}
				aspectRatioClassName={styles.aspectRatioClassName}
			/>
		</div>
	);
}
export default UserInfo;
