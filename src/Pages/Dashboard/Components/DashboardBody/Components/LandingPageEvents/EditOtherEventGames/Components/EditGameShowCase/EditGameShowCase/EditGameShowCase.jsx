import { useState } from 'react';
import GamesShowcase from '../../../../../../../../../../Shared/GamesShowcase/GamesShowcase/GamesShowcase';
import styles from './EditGameShowCase.module.css';

function ExtraCard({ index }) {
	return <EditGameShowCase index={index} />;
}

function EditGameShowCase() {
	const [items, setItems] = useState([
		{ id: 0, games: [] },
		{ id: 1, games: [] },
		{ id: 2, games: [] },
	]);

	return (
		<div className={styles.editGameShowCase}>
			<GamesShowcase items={items} extraCard={ExtraCard} />
		</div>
	);
}
export default EditGameShowCase;
