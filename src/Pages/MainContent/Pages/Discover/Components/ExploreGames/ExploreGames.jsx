import { useEffect, useRef, useState } from 'react';
import RippleEffect from '../../../../../../Shared/RippleEffect/RippleEffect';
import useScreenWidth from '../../../../../../Utils/Hooks/useScreenWidth';
import styles from './ExploreGames.module.css';

const fetched = {
	heading: 'Explore Our Catalog',
	details: 'Browse by genre, features, price, and more to find your next favorite game.',
	backgroundDesktop: '/assets/images/hitmanBackgound/hitman.png',
	backgroundPhone: '/assets/images/hitmanBackgound/hitman-mobile.jpg',
};

export default function ExploreGames() {
	const containerRef = useRef(null);
	const { widthInRem } = useScreenWidth();
	const [data, setData] = useState({});

	useEffect(() => {
		setData(fetched);

		const calculateObserver = () => {
			const mainContainerWidth = containerRef.current.getBoundingClientRect().width;

			let angleDeg;
			if (mainContainerWidth > 1600) {
				// Adjust the threshold
				angleDeg = 6;
			} else {
				angleDeg = 6 + (15 - 6) * (1 - mainContainerWidth / 1600); // Linear interpolation
			}
			angleDeg = parseFloat(angleDeg.toFixed(2));
			const rad = angleDeg * (Math.PI / 180);

			const lengthOfIntersectionHeight = mainContainerWidth * rad;
			const widthOfAngledSquare = Math.ceil(
				Math.sqrt(mainContainerWidth ** 2 + lengthOfIntersectionHeight ** 2)
			);

			const heightOfAngledSquare = Math.ceil(
				mainContainerWidth *
					Math.sin(
						Math.atan(
							lengthOfIntersectionHeight /
								(mainContainerWidth -
									Math.ceil(
										lengthOfIntersectionHeight -
											widthOfAngledSquare * Math.tan(rad)
									) *
										Math.tan(rad))
						)
					)
			);

			containerRef.current.style.setProperty('--angle-deg', `${angleDeg}deg`);
			containerRef.current.style.setProperty(
				'--bars-height',
				`${heightOfAngledSquare + 2}px`
			);
			containerRef.current.style.setProperty('--bars-width', `${widthOfAngledSquare + 2}px`);
		};

		const observer = new ResizeObserver(calculateObserver);
		observer.observe(containerRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<section className={styles.exploreGames}>
			<div className={styles.exploreGamesBackground} ref={containerRef}>
				<div
					className={styles.imageBackground}
					style={
						widthInRem >= 48.0625
							? { backgroundImage: `url(${fetched.backgroundDesktop})` }
							: { backgroundImage: `url(${fetched.backgroundPhone})` }
					}
				/>
			</div>
			<div className={styles.exploreGamesContent}>
				<div className={styles.exploreTexts}>
					<h4>{data.heading}</h4>
					<p>{data.details}</p>
					<a href='#d' type='button'>
						Learn More
						<RippleEffect background='white' long />
					</a>
				</div>
			</div>
		</section>
	);
}
