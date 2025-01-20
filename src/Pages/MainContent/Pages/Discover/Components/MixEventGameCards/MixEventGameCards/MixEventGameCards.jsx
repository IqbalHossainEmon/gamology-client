import { useEffect, useState } from 'react';
import MixEventGameCard from '../Components/MixEventGameCard/MixEventGameCard';
import styles from './MixEventGameCards.module.css';

const data = [
	{
		id: 1000,
		image: 'https://via.placeholder.com/150',
		title: "Marvel's Spider-Man Remastered",
		description: 'Description 0',
		footer: { regular: 59.99, discount: 29.99 },
	},
	{
		id: 1001,
		title: 'Title 1',
		image: 'https://via.placeholder.com/150',

		description: 'Description 1',
		footer: ['Button 1', 'Button 2'],
	},
	{
		id: 1002,
		title: 'Title 2',
		image: 'https://via.placeholder.com/150',
		description: 'Description 2',
		footer: 'Footer 2',
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
					<MixEventGameCard key={item.id} data={item} />
				))}
			</ul>
		</section>
	);
}
export default MixEventGameCards;
