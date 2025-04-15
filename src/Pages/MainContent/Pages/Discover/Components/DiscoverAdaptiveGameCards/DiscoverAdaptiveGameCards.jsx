import { useEffect, useState } from 'react';

import AdaptiveCards from '../../../../../../Shared/AdaptiveCards/AdaptiveCards/AdaptiveCards';

import styles from './DiscoverAdaptiveGameCards.module.css';

const data = [
	{
		id: 1000,
		image: 'https://images.unsplash.com/photo-1532630571098-79a3d222b00d?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		title: "Marvel's Spider-Man Remastered",
		description: 'Description 0',
		footer: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 1001,
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
		id: 1002,
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

function DiscoverAdaptiveGameCards() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(data);
	}, []);

	return (
		<div className={styles.discoverDynamicGameCards}>
			<AdaptiveCards items={items} link='/' />
		</div>
	);
}
export default DiscoverAdaptiveGameCards;
