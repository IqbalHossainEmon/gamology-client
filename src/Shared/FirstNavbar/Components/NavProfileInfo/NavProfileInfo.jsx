import Image from '../../../Image/Image/Image';
import styles from './NavProfileInfo.module.css';

export default function NavProfileInfo() {
	return (
		<div className={styles.profile}>
			<div className={styles.profileImg}>
				<Image
					data='/assets/images/user-1.svg'
					placeholder={<img src='/assets/images/user-1.svg' alt='User icon' />}
					alt='arrow-down'
					aspectRatio={1}
				/>
			</div>
			<p>iqbal.hossain.emon</p>
		</div>
	);
}
