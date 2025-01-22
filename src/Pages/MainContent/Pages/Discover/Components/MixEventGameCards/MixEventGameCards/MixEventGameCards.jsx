import { useEffect, useState } from 'react';
import MixEventGameCard from '../Components/MixEventGameCard/MixEventGameCard';
import styles from './MixEventGameCards.module.css';

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
		footer: ['Read More', 'Browse'],
	},
	{
		id: 1002,
		title: 'Title 2',
		image: 'https://images.unsplash.com/photo-1532630571098-79a3d222b00d?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		description: 'Description 2',
		footer: ['Play Now'],
	},
];

function MixEventGameCards() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(data);
	}, []);

	return (
		<section className={styles.mixEventGameCards}>
			<ul className={styles.mixEventGameCardsList}>
				{items.map(item => (
					<MixEventGameCard key={item.id} data={item} isOnlyOne={items.length === 1} />
				))}
			</ul>
		</section>
	);
}
export default MixEventGameCards;
