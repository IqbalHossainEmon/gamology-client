import { useState } from 'react';
import useScreenWidth from '../../../../../../../Utils/Hooks/useScreenWidth';
import ChangeEventButtons from '../Components/ChangeEventButtons/ChangeEventButtons';
import GamesColumn from '../Components/EventGamesGamesColumn/EventGamesGamesColumn';
import StickyChangeButtons from '../Components/StickyChangeButtons/StickyChangeButtons';
import styles from './EventGames.module.css';

const newGames = [
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
		carouselThumb: '/assets/images/CarouselCard/a-plague-tale-requiem-carousel-thumb.jpg',
		price: { regular: 59.99, discount: 29.99 },
	},
];
const header = ['New Releases', 'Top Rated', 'Coming Soon'];

export default function EventGames() {
	const screenWidth = useScreenWidth();
	const [cardPosition, setCardPosition] = useState(0);

	return (
		<section className={styles.container}>
			{screenWidth <= 768 && <StickyChangeButtons setCardPosition={setCardPosition} />}
			<div className={styles.eventGamesContainer}>
				<ul
					className={styles.eventGames}
					{...(screenWidth < 768 && {
						style: { translate: `-${100 * cardPosition}%` },
					})}
				>
					{header.map((item, index) => (
						<GamesColumn
							bar={index !== header.length - 1}
							cardPosition={cardPosition}
							colNum={index}
							games={newGames}
							header={item}
							key={item}
						/>
					))}
				</ul>
			</div>
			{screenWidth <= 768 && (
				<ChangeEventButtons cardPosition={cardPosition} setCardPosition={setCardPosition} />
			)}
		</section>
	);
}
