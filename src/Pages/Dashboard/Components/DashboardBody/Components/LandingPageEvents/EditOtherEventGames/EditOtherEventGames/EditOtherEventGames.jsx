import { useEffect, useRef, useState } from 'react';
import useObjectUtilities from '../../../../../../../../Utils/Hooks/useObjectUtilities';
import ButtonWithRipple from '../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import EditAdaptiveGameCards from '../Components/EditAdaptiveGameCards/EditAdaptiveGameCards/EditAdaptiveGameCards';
import EditGameShowCase from '../Components/EditGameShowCase/EditGameShowCase/EditGameShowCase';
import styles from './EditOtherEventGames.module.css';

const showcaseDefaultData = [
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

const adaptiveGameData = [
	{
		link: "/games/marvels'_spider-man-remastered",
		image: null,
		title: "Marvel's Spider-Man Remastered",
		description: 'Description 0',
		footer: { regular: 59.99, discount: 29.99 },
	},
	{
		link: '/browse',
		title: 'Title 1',
		image: 'https://images.unsplash.com/photo-1532630571098-79a3d222b00d?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

		description: 'Description 1',
		footer: [
			{ text: 'Read More', link: '#/' },
			{
				text: 'Browse',
				link: '#/',
			},
		],
	},
	{
		link: '/news',
		title: 'Title 2',
		image: 'https://images.unsplash.com/photo-1532630571098-79a3d222b00d?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		description: 'Description 2',
		footer: [
			{
				text: 'Read More',
				link: '#/',
			},
		],
	},
];

const allItemsDefault = [
	{
		id: 0,
		type: 'showcase',
		games: [
			{ id: 0, games: [] },
			{ id: 1, games: [] },
			{ id: 2, games: [] },
		],
	},
	{
		id: 1,
		type: 'adaptiveCard',
		cards: [],
	},
];

function EditOtherEventGames() {
	const [loading, setLoading] = useState(true);
	const [allItems, setAllItems] = useState(allItemsDefault);

	const sectionsRefs = useRef(allItemsDefault);

	const { cloneObject } = useObjectUtilities();

	useEffect(() => {
		const outerData = [];

		for (let i = 0; i < 6; i++) {
			if (i % 2 === 0) {
				outerData.push({
					id: i,
					type: 'showcase',
					games: cloneObject(showcaseDefaultData),
				});
			} else {
				outerData.push({
					id: i,
					type: 'adaptiveCard',
					cards: cloneObject(adaptiveGameData),
				});
			}
		}

		setAllItems(cloneObject(outerData));
		sectionsRefs.current = cloneObject(outerData);
		setLoading(false);
	}, [cloneObject]);

	return (
		<div className={styles.editOtherEventGames}>
			{loading ? (
				<p>loading...</p>
			) : (
				<>
					<h2 className={styles.editOtherEventGamesHeader}>Edit Other Events</h2>
					{allItems.map((items, index) => {
						if (!!items.games || !!items.cards)
							return (
								<div key={items.id} className={styles.editOtherEventSection}>
									{items.games ? (
										<EditGameShowCase
											parentIndex={index}
											defaultItems={items.games}
											dataRef={sectionsRefs}
											onDelete={parentIndex => {
												setAllItems(prev => {
													const temp = [...prev];
													temp.splice(parentIndex, 1);
													sectionsRefs.current.splice(items.id, 1);
													return temp;
												});
											}}
										/>
									) : items.cards ? (
										<EditAdaptiveGameCards
											parentIndex={index}
											dataRef={sectionsRefs}
											defaultItems={items.cards}
										/>
									) : null}
								</div>
							);
						return null;
					})}
					<div>
						<ButtonWithRipple
							onClick={() => {
								setAllItems(prev => {
									const temp = [...prev];
									const emptyData = [
										{ id: 0, games: [] },
										{ id: 1, games: [] },
										{ id: 2, games: [] },
									];
									temp.push({
										id: temp.length,
										type: 'showcase',
										games: cloneObject(emptyData),
									});
									sectionsRefs.current.push({
										id: temp.length,
										type: 'showcase',
										games: cloneObject(emptyData),
									});
									console.log(temp);

									return temp;
								});
							}}
						>
							Add more +
						</ButtonWithRipple>
					</div>
				</>
			)}
		</div>
	);
}
export default EditOtherEventGames;
