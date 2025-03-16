import { useEffect, useState } from 'react';
import GamesShowcase from '../../../../../../Shared/GamesShowcase/GamesShowcase/GamesShowcase';
import styles from './DiscoverGameShowCase.module.css';

const newGames = [
	{
		id: 0,
		header: 'New Releases',
		games: [
			{
				id: 1000,
				name: "Marvel's Spider-Man Remastered",
				carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
				price: { regular: 59.99, discount: 29.99 },
			},
			{
				id: 1001,
				name: 'UNCHARTED™: Legacy of Thieves Collection',
				carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
				price: { regular: 49.99, discount: 15.99 },
			},
			{
				id: 1010,
				name: 'Fall Guy',
				carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
				price: 59,
			},
			{
				id: 1011,
				name: 'Fortnite',
				carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
				price: 0,
			},
			{
				id: 1100,
				name: 'A Plague Tale Requiem',
				carouselThumb:
					'/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
				price: { regular: 59.99, discount: 29.99 },
			},
		],
	},
	{
		id: 1,
		header: 'Top Rated',
		games: [
			{
				id: 1000,
				name: "Marvel's Spider-Man Remastered",
				carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
				price: { regular: 59.99, discount: 29.99 },
			},
			{
				id: 1001,
				name: 'UNCHARTED™: Legacy of Thieves Collection',
				carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
				price: { regular: 49.99, discount: 15.99 },
			},
			{
				id: 1010,
				name: 'Fall Guy',
				carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
				price: 59,
			},
			{
				id: 1011,
				name: 'Fortnite',
				carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
				price: 0,
			},
			{
				id: 1100,
				name: 'A Plague Tale Requiem',
				carouselThumb:
					'/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
				price: { regular: 59.99, discount: 29.99 },
			},
		],
	},
	{
		id: 2,
		header: 'Coming Soon',
		games: [
			{
				id: 1000,
				name: "Marvel's Spider-Man Remastered",
				carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
				price: { regular: 59.99, discount: 29.99 },
			},
			{
				id: 1001,
				name: 'UNCHARTED™: Legacy of Thieves Collection',
				carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
				price: { regular: 49.99, discount: 15.99 },
			},
			{
				id: 1010,
				name: 'Fall Guy',
				carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
				price: 59,
			},
			{
				id: 1011,
				name: 'Fortnite',
				carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
				price: 0,
			},
			{
				id: 1100,
				name: 'A Plague Tale Requiem',
				carouselThumb:
					'/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
				price: { regular: 59.99, discount: 29.99 },
			},
		],
	},
];

function DiscoverGameShowcase() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(newGames);
	}, []);

	return (
		<div className={styles.discoverGameShowCase}>
			<GamesShowcase items={items} link='/' />
		</div>
	);
}
export default DiscoverGameShowcase;
