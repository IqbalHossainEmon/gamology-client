import { useEffect, useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import Image from '../../../../../../../Shared/Image/Image/Image';
import FreeGame from '../FreeGame/FreeGame';
import styles from './FreeGames.module.css';

const data = [
	{
		id: 100,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/CarouselInfo/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/CarouselCoverMobile/spider-man-remaster-carousel-mobile.png',
		price: 'Comming soon',
		saleTill: [
			[12, 12, 2022],
			[31, 12, 2025],
		],
	},
	{
		id: 101,
		category: {
			card: 'Base game',
		},
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
		price: 0,
		saleTill: [
			[2, 11, 2022],
			[24, 12, 2025],
		],
	},
	{
		id: 110,
		category: {
			card: 'Base game',
		},
		name: 'Fall Guy',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/CarouselInfo/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/fall-guys-carousel-mobile.jpg',
		price: 0,
		saleTill: [
			[11, 12, 2024],
			[15, 12, 2025],
		],
	},
	{
		id: 111,
		category: {
			card: 'Base game',
		},
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CarouselCoverMobile/fortnite-carousel-mobile.jpg',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/CarouselInfo/fortnite-carousel-logo.png',
		price: 0,
		saleTill: [
			[1, 11, 2024],
			[23, 12, 2025],
		],
	},
];

const date = new Date();
const today = [date.getDate(), date.getMonth() + 1, date.getFullYear()];

export default function FreeGames() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(data);
	}, []);

	const btnRef = useRef(null);

	return (
		<section className={styles.freeGames}>
			<div className={styles.header}>
				<div className={styles.headerIcon}>
					<Image
						data='/assets/images/gift.png'
						alt='gift'
						aspectRatioClassName={styles.aspectRatioClassName}
					/>
				</div>
				<h3 className={styles.headerName}>Free games</h3>
				<button className={styles.viewMoreBtn} type='button'>
					View More
					<ButtonWaterEffect />
				</button>
			</div>
			<ul className={`${styles.games} ${styles[`games${items.length}`]}`}>
				{items.map(item => (
					<FreeGame data={item} key={item.id} length={items.length} today={today} />
				))}
			</ul>
		</section>
	);
}
