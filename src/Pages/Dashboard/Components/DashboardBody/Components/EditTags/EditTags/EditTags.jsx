import { useEffect, useState } from 'react';
import AddTags from '../Components/AddTags/AddTags/AddTags';
import ShowCategoryTags from '../Components/ShowTags/ShowCategoryTags/ShowCategoryTags';
import styles from './EditTags.module.css';

const data = [
	{
		id: 0,
		category: 'Genre',
		optionList: [
			{ id: 0, text: 'Action', filter: 'action' },
			{ id: 1, text: 'Adventure', filter: 'adventure' },
			{ id: 2, text: 'Racing', filter: 'racing' },
			{ id: 3, text: 'Shooter', filter: 'shooter' },
			{ id: 4, text: 'Role-playing', filter: 'rolePlaying' },
			{ id: 5, text: 'Sports', filter: 'sports' },
			{ id: 6, text: 'Strategy', filter: 'strategy' },
			{ id: 7, text: 'Simulation', filter: 'simulation' },
		],
	},
	{
		id: 1,
		category: 'Features',
		optionList: [
			{ id: 0, text: 'Single-player', filter: 'singlePlayer' },
			{ id: 1, text: 'Multi-player', filter: 'multiPlayer' },
			{ id: 2, text: 'Co-op', filter: 'coOp' },
			{ id: 3, text: 'Achievements', filter: 'achievements' },
			{ id: 4, text: 'Leader Boards', filter: 'leaderBoards' },
			{
				id: 5,
				text: 'Controller support',
				filter: 'controllerSupport',
			},
			{ id: 6, text: 'Cloud saves', filter: 'cloudSaves' },
			{ id: 7, text: 'Overlay', filter: 'overlay' },
		],
	},
];

const EditTags = () => {
	const [tags, setTags] = useState([]);

	useEffect(() => {
		setTags(data);
	}, []);

	return (
		<div className={styles.addTags}>
			<h2 className={styles.tagsHeader}>Tags</h2>
			<ShowCategoryTags setTags={setTags} tags={tags} />
			<AddTags tags={tags} setTags={setTags} />
		</div>
	);
};
export default EditTags;
