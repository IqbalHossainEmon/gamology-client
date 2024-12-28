import { useEffect } from 'react';
import useChangeBodyOverflow from '../../../Utils/Hooks/useChangeBodyOverflow';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import Image from '../../Image/Image';
import FirstNavLinks from '../Components/FirstNavLinks/FirstNavLinks';
import MobileBurgerMenu from '../Components/MobileBurgerMenu/MobileBurgerMenu';
import NavProfileInfo from '../Components/NavProfileInfo/NavProfileInfo';
import styles from './FirstNavbar.module.css';

export default function FirstNavbar() {
	const screenWidth = useScreenWidth();
	const { hideBodyOverflow, showBodyOverflow } = useChangeBodyOverflow();

	useEffect(() => {
		if (screenWidth > 768) {
			showBodyOverflow();
		}
	}, [showBodyOverflow, screenWidth]);

	return (
		<header className={styles.header}>
			<nav className={styles.firstNavbar}>
				<div className={styles.gamologyLogo}>
					<a href='/' className={styles.gamologyLogoImg}>
						<Image
							data='/assets/images/game-controller.png'
							alt='gamology'
							aspectRatioClassName={styles.aspectRatioClassName}
						/>
					</a>
				</div>

				{screenWidth > 768 ? (
					<div className={styles.navOptions}>
						<FirstNavLinks />
						<NavProfileInfo />
					</div>
				) : (
					<MobileBurgerMenu
						hideBodyOverflow={hideBodyOverflow}
						showBodyOverflow={showBodyOverflow}
					/>
				)}
			</nav>
		</header>
	);
}
