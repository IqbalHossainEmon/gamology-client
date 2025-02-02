import { useState } from 'react';
import GamesShowcase from '../../../../../../../../../../Shared/GamesShowcase/GamesShowcase/GamesShowcase';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import NormalButtonWithEffects from '../../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameShowCaseExtraCard from '../Components/EditGameShowCaseExtraCard/EditGameShowCaseExtraCard';
import styles from './EditGameShowCase.module.css';

function extraCard(index, onclick) {
	return <EditGameShowCaseExtraCard index={index} onclick={game => onclick(index, game)} />;
}

function EditGameShowCase({ dataRef, defaultItems, onDelete }) {
	const { cloneObject } = useObjectUtilities();

	const [items, setItems] = useState(cloneObject(defaultItems));

	const onclick = (index, game) => {
		setItems(prev => {
			const temp = [...prev];
			temp[index].games.push(game);
			dataRef.current[index].games.push(game);
			return temp;
		});
	};

	return (
		<div className={styles.editGameShowCase}>
			<GamesShowcase
				items={items}
				extraCard={index => extraCard(index, onclick)}
				dataRef={dataRef}
			/>
			<div className={styles.btnContainer}>
				<NormalButtonWithEffects
					text='Reset'
					onClick={() => {
						setItems(cloneObject(defaultItems));
						dataRef.current = cloneObject(defaultItems);
					}}
				/>
				<NormalButtonWithEffects text='Delete' onClick={onDelete} />
			</div>
		</div>
	);
}
export default EditGameShowCase;
