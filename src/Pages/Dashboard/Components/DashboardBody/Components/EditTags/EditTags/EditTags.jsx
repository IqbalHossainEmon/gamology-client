import { useEffect, useState } from 'react';
import AddTags from '../Components/AddTags/AddTags/AddTags';
import ShowCategoriesTags from '../Components/ShowCategoriesTags/ShowCategoriesTags/ShowCategoriesTags';
import styles from './EditTags.module.css';

const data = [
	{
		category: 'Genre',
		tags: [
			'Action',
			'Adventure',
			'Racing',
			'Shooter',
			'Role-playing',
			'Sports',
			'Strategy',
			'Simulation',
		],
	},
	{
		category: 'Features',
		tags: [
			'Single-player',
			'Multi-player',
			'Co-op',
			'Achievements',
			'Leader Boards',
			'Controller support',
			'Cloud saves',
			'Overlay',
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
			<ShowCategoriesTags setCategories={setCategories} categories={categories} />
			<AddTags setCategories={setCategories} categories={categories} />
		</div>
	);
}
export default EditTags;
