import Image from '../../../Image/Image/Image';
import styles from './NavProfileInfo.module.css';

export default function NavProfileInfo() {
	return (
		<div className={styles.profile}>
			<div className={styles.profileImg}>
				<Image
					data='https://lh3.googleusercontent.com/ogw/AF2bZygh4Gaz74LySHho2ZDoL7Kx36aYvvRDCwKNx_yYuMk0EA=s32-c-mo'
					placeholder={<img src='/assets/images/user-1.svg' alt='User icon' />}
					alt='arrow-down'
					aspectRatioClassName={styles.aspectRatioClassName}
				/>
			</div>
			<p>iqbal.hossain.emon</p>
		</div>
	);
}
