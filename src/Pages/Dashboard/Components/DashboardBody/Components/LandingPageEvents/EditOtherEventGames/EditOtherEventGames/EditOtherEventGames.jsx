import { useEffect, useRef, useState } from 'react';
import useObjectUtilities from '../../../../../../../../Utils/Hooks/useObjectUtilities';
import NormalButtonWithEffects from '../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameShowCase from '../Components/EditGameShowCase/EditGameShowCase/EditGameShowCase';
import styles from './EditOtherEventGames.module.css';

const data = [
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

const emptyShowcaseItems = [
	{ id: 0, games: [] },
	{ id: 1, games: [] },
	{ id: 2, games: [] },
];

function EditOtherEventGames() {
	const [loading, setLoading] = useState(true);
	const [allItems, setAllItems] = useState([
		{
			id: 0,
			type: 'showcase',
			items: emptyShowcaseItems,
		},
	]);

	const sectionsRefs = useRef([emptyShowcaseItems]);

	const { cloneObject } = useObjectUtilities();

	useEffect(() => {
		const outerData = [];

		for (let i = 0; i < 5; i++) {
			outerData.push({
				id: i,
				type: 'showcase',
				items: cloneObject(data),
			});
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
				<div>
					<h2 className={styles.editOtherEventGames}>Edit Other Events</h2>
					{allItems.map(items => {
						switch (items.type) {
							case 'showcase':
								return (
									<EditGameShowCase
										key={items.id}
										defaultItems={items.items}
										dataRef={sectionsRefs}
										onDelete={() => {
											setAllItems(prev => {
												const temp = [...prev];
												temp.splice(items.id, 1);
												sectionsRefs.current.splice(items.id, 1);
												return temp;
											});
										}}
									/>
								);
							default:
								break;
						}
						return null;
					})}
					<div>
						<NormalButtonWithEffects
							text='Add more +'
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
										items: cloneObject(emptyData),
									});
									sectionsRefs.current.push({
										id: temp.length,
										items: cloneObject(emptyData),
									});
									return temp;
								});
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
export default EditOtherEventGames;
