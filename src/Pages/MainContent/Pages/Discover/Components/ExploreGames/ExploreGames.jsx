import { useEffect, useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import useScreenWidth from '../../../../../../Utils/Hooks/useScreenWidth';
import styles from './ExploreGames.module.css';

const fetched = {
	heading: 'Explore Our Catalog',
	details: 'Browse by genre, features, price, and more to find your next favorite game.',
	backgroundDesktop: '/assets/images/hitmanBackgound/hitman.png',
	backgroundPhone: '/assets/images/hitmanBackgound/hitman-mobile.jpg',
};

export default function ExploreGames() {
	const buttonRef = useRef(null);
	const { screenWidth } = useScreenWidth();
	const [data, setData] = useState({});

	useEffect(() => {
		setData(fetched);
	}, []);

	return (
		<section className={styles.ExploreGames}>
			<div
				className={styles.exploreGamesBackground}
				style={
					screenWidth >= 769
						? { backgroundImage: `url(${fetched.backgroundDesktop})` }
						: { backgroundImage: `url(${fetched.backgroundPhone})` }
				}
			>
				<div className={styles.ExploreTexts}>
					<h4>{data.heading}</h4>

					<p>{data.details}</p>

					<a href='#d' ref={buttonRef} type='button'>
						Learn More
						<ButtonWaterEffect backGround='white' btnRef={buttonRef} long />
					</a>
				</div>
			</div>
		</section>
	);
}
