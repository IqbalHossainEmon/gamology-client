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
	const containerRef = useRef(null);
	const screenWidth = useScreenWidth();
	const [data, setData] = useState({});

	useEffect(() => {
		setData(fetched);

		const a = containerRef.current.getBoundingClientRect().width;
		const b = containerRef.current.getBoundingClientRect().height;
		const f = a * 0.10510423526567647;
		const x = Math.ceil(Math.sqrt(a ** 2 + f ** 2));
		const y = Math.ceil(Math.sqrt((a - x) ** 2 + (b - f) ** 2));

		containerRef.current.style.setProperty('--bars-width', `${x}px`);
		containerRef.current.style.setProperty('--bars-height', `${y}px`);

		console.log(Math.sqrt(a ** 2 + f ** 2), a, y);
	}, []);

	return (
		<section className={styles.exploreGames}>
			<div
				className={styles.exploreGamesBackground}
				ref={containerRef}
				style={
					screenWidth >= 769
						? { backgroundImage: `url(${fetched.backgroundDesktop})` }
						: { backgroundImage: `url(${fetched.backgroundPhone})` }
				}
			>
				<div className={styles.exploreTexts}>
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
