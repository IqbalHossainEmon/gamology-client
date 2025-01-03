import { useState } from 'react';
import TypeableSelectionField from '../../../../../../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import styles from './EditGameCardAddCardFooter.module.css';

function EditGameCardAddCardBody() {
	const [height, setHeight] = useState(0);

	return (
		<>
			<h3 className={styles.title}>Search for the game you want to add to the list: </h3>
			<div
				style={{
					height: height ? `${height + 60}px` : '60px',
				}}
				className={styles.footer}
			>
				<TypeableSelectionField
					setHeight={setHeight}
					htmlFor='addGameCard'
					placeholder='Search for a game'
				/>
			</div>
		</>
	);
}
export default EditGameCardAddCardBody;
