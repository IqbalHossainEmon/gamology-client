import { useEffect, useState } from 'react';

import OptionsContainer from '../Components/OptionsContainer/OptionsContainer';
import PriceReleaseDate from '../Components/PriceReleaseDate/PriceReleaseDate/PriceReleaseDate';

import styles from './GameInfoFieldTags.module.css';

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
			'controllerSupport',
			'Cloud saves',
			'Overlay',
		],
	},
];

export default function GameInfoFieldTags({
	gameData,
	errorChange,
	errorMessages,
	hasDefault,
	defaultGameTags,
	defaultReleaseDate,
	defaultPrice,
}) {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		setCategories(data);
	}, []);

	const getInitialState = (tags, category) => {
		const initialState = {};
		tags.forEach(tag => {
			if (hasDefault && defaultGameTags[category][tag]) {
				initialState[tag] = true;
			} else {
				initialState[tag] = false;
			}
		});
		return initialState;
	};
	return (
		<section className={styles.addGameTags}>
			<h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&apos;s tags</h3>
			<div className={styles.optionsContainer}>
				{categories.map(category => (
					<div className={styles.options} key={category.category}>
						<OptionsContainer
							errorChange={errorChange}
							errorMessage={errorMessages.current.gameTagsError[category.category]}
							gameTags={gameData}
							initialState={getInitialState(category.tags, category.category)}
							tags={category.tags}
							title={category.category}
						/>
					</div>
				))}
			</div>
			<PriceReleaseDate
				defaultPrice={defaultPrice}
				defaultReleaseDate={defaultReleaseDate}
				errorChange={errorChange}
				errorMessage={errorMessages.current.gameTagsError.releaseDate}
				gameInfo={gameData}
				hasDefault={hasDefault}
			/>
		</section>
	);
}
