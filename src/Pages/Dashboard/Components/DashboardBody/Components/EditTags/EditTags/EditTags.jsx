import { useEffect, useState } from 'react';
import AddTags from '../Components/AddTags/AddTags/AddTags';
import ShowCategoryTags from '../Components/ShowTags/ShowCategoryTags/ShowCategoryTags';
import styles from './EditTags.module.css';

const data = [
	{
		category: 'Genre',
		tags: [
			{ tag: 'Action' },
			{ tag: 'Adventure' },
			{ tag: 'Racing' },
			{ tag: 'Shooter' },
			{ tag: 'Role-playing' },
			{ tag: 'Sports' },
			{ tag: 'Strategy' },
			{ tag: 'Simulation' },
		],
	},
	{
		category: 'Features',
		tags: [
			{ tag: 'Single-player' },
			{ tag: 'Multi-player' },
			{ tag: 'Co-op' },
			{ tag: 'Achievements' },
			{ tag: 'Leader Boards' },
			{
				tag: 'Controller support',
			},
			{ tag: 'Cloud saves' },
			{ tag: 'Overlay' },
		],
	},
];

function EditTags() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		setCategories(data);
	}, []);

	return (
		<div className={styles.addTags}>
			<h2 className={styles.tagsHeader}>Tags</h2>
			<ShowCategoryTags setCategories={setCategories} categories={categories} />
			<AddTags setCategories={setCategories} categories={categories} />
		</div>
	);
}
export default EditTags;
