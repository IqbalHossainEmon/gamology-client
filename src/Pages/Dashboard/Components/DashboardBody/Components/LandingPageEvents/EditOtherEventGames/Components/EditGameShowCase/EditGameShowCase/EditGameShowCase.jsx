import { useRef, useState } from 'react';
import GamesShowcase from '../../../../../../../../../../Shared/GamesShowcase/GamesShowcase/GamesShowcase';
import EditGameShowCaseExtraCard from '../Components/EditGameShowCaseExtraCard/EditGameShowCaseExtraCard';
import styles from './EditGameShowCase.module.css';

function extraCard(index, onclick) {
	return <EditGameShowCaseExtraCard index={index} onclick={game => onclick(index, game)} />;
}

function EditGameShowCase({ dataRef }) {
	const [items, setItems] = useState([
		{ id: 0, games: [] },
		{ id: 1, games: [] },
		{ id: 2, games: [] },
	]);

	const showcaseRef = useRef([
		{ id: 0, games: [] },
		{ id: 1, games: [] },
		{ id: 2, games: [] },
	]);

	const onclick = (index, game) => {
		setItems(prev => {
			const temp = [...prev];
			temp[index].games.push(game);
			showcaseRef.current[index].games.push(game);
			return temp;
		});
	};

	return (
		<div className={styles.editGameShowCase}>
			<GamesShowcase
				items={items}
				extraCard={index => extraCard(index, onclick)}
				dataRef={showcaseRef}
			/>
			<button
				type='button'
				onClick={() => {
					console.log(showcaseRef);
				}}
			>
				Show
			</button>
		</div>
	);
}
export default EditGameShowCase;
