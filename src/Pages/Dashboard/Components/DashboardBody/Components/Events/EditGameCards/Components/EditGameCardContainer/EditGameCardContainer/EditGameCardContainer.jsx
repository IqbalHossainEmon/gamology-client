import { useState } from 'react';
import GameCards from '../../../../../../../../../../Shared/GameCards/GameCards/GameCards';
import TextField from '../../../../../../../../../../Shared/TextField/TextField/TextField';
import EditGameCardAddCard from '../Components/EditGameCardAddCard/EditGameCardAddCard';
import styles from './EditGameCardContainer.module.css';

const handleExtraCard = (width, margin, handleCLick) => (
	<EditGameCardAddCard width={width} margin={margin} onClick={handleCLick} />
);

function EditGameCardContainer({ defaultData }) {
	const [cards, setCards] = useState(defaultData || { header: '', cards: [] });

	const handleCLick = card => {
		setCards(prev => ({ ...prev, cards: [...prev.cards, card] }));
	};

	return (
		<section className={styles.games}>
			<GameCards
				customHeader={
					<div className={styles.header}>
						<TextField
							field='input'
							placeholder='Write the title'
							htmlFor='header-of'
							defaultValue={cards.header}
							setState={value => setCards(prev => ({ ...prev, header: value }))}
						/>
					</div>
				}
				items={cards.cards}
				extraCard={(width, margin) => handleExtraCard(width, margin, handleCLick)}
				scrollToLast
			/>
		</section>
	);
}
export default EditGameCardContainer;
