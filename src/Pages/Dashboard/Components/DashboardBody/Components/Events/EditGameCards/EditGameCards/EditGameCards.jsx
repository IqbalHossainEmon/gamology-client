import { useEffect, useRef, useState } from 'react';
import EditGameCardFirstPart from '../Components/EditGameCardFirstPart/EditGameCardFirstPart';
import styles from './EditGameCards.module.css';

const items = [
	{
		id: 10000,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 10001,
		category: {
			card: 'Base game',
		},
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/n7cSm73/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
		price: { regular: 64.99, discount: 18.99 },
	},
	{
		id: 10010,
		category: {
			card: 'Base game',
		},
		name: 'Fall Guy',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 39.99, discount: 29.99 },
	},
	{
		id: 100011,
		category: {
			card: 'Base game',
		},
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
		price: { regular: 34.99, discount: 25.99 },
	},
	{
		id: 100100,
		category: {
			card: 'Base game',
		},
		name: 'A Plague Tale Requiem',
		logoImg: '/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
		coverImg: '/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		coverMobile: '/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
		price: { regular: 36.99, discount: 24.99 },
	},
	{
		id: 100101,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 100110,
		category: {
			card: 'Base game',
		},
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/n7cSm73/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
		price: { regular: 64.99, discount: 18.99 },
	},
	{
		id: 100111,
		category: {
			card: 'Base game',
		},
		name: 'Fall Guy',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 39.99, discount: 29.99 },
	},
	{
		id: 101000,
		category: {
			card: 'Base game',
		},
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
		price: { regular: 34.99, discount: 25.99 },
	},
	{
		id: 101001,
		category: {
			card: 'Base game',
		},
		name: 'A Plague Tale Requiem',
		logoImg: '/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
		coverImg: '/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		coverMobile: '/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
		price: { regular: 36.99, discount: 24.99 },
	},
	{
		id: 101010,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 101011,
		category: {
			card: 'Base game',
		},
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/n7cSm73/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
		price: { regular: 64.99, discount: 18.99 },
	},
	{
		id: 101100,
		category: {
			card: 'Base game',
		},
		name: 'Fall Guy',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 39.99, discount: 29.99 },
	},
	{
		id: 101101,
		category: {
			card: 'Base game',
		},
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
		price: { regular: 34.99, discount: 25.99 },
	},
	{
		id: 101110,
		category: {
			card: 'Base game',
		},
		name: 'A Plague Tale Requiem',
		logoImg: '/assets/images/D4XXzTW/a-plague-tale-requiem-logo.png',
		coverImg: '/assets/images/CarouselCoverDesktop/a-plague-tale-requiem-cover.jpg',
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		coverMobile: '/assets/images/25xZ0tJ/a-plague-tale-requiem-carousel-mobile.jpg',
		price: { regular: 36.99, discount: 24.99 },
	},
	{
		id: 101111,
		category: {
			card: 'Base game',
		},
		name: "Marvel's Spider-Man Remastered",
		coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
		logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
		carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
		coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
		price: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 110000,
		category: {
			card: 'Base game',
		},
		name: 'UNCHARTED™: Legacy of Thieves Collection',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
		logoImg: '/assets/images/n7cSm73/fortnite-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/CPyXG7n/uncharted-carousel-mobile.jpg',
		price: { regular: 64.99, discount: 18.99 },
	},
	{
		id: 110001,
		category: {
			card: 'Base game',
		},
		name: 'Fall Guy',
		coverImg: '/assets/images/CarouselCoverDesktop/fall-guy.png',
		logoImg: '/assets/images/QF3t3jQ/fall-guy-logo.png',
		carouselThumb: '/assets/images/CarouselCard/fall-guys-carousel-thumb.jpg',
		coverMobile: '/assets/images/BNm4v3M/fall-guys-carousel-mobile.jpg',
		price: { regular: 39.99, discount: 29.99 },
	},
	{
		id: 110010,
		category: {
			card: 'Base game',
		},
		name: 'Fortnite',
		carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
		coverMobile: '/assets/images/6X04C8f/fortnite-carousel-mobile.jpg',
		coverImg: '/assets/images/CarouselCoverDesktop/fortnite-carousel-desktop.jpg',
		logoImg: '/assets/images/SyGvndD/fortnite-carousel-logo.png',
		price: { regular: 34.99, discount: 25.99 },
	},
];

function EditGameCards() {
	const [gameCards, setGameCards] = useState([[]]);
	const [isLoading, setIsLoading] = useState(true);

	const cardsRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			const gameCardData = [
				[
					{ id: 0, header: 'Best sell', cards: items },
					// { id: 1, header: 'WOW sell', cards: items },
				],
			];

			cardsRef.current = gameCardData;
			setGameCards(gameCardData);
			setIsLoading(false);
		}, 200);
	}, []);

	return (
		<div className={styles.editGameCards}>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<h2 className={styles.editBannerHeader}>Edit Game Cards</h2>
					<EditGameCardFirstPart
						gameCards={gameCards[0]}
						cardsRef={cardsRef}
						setGameCards={setGameCards}
					/>
				</>
			)}
		</div>
	);
}
export default EditGameCards;
