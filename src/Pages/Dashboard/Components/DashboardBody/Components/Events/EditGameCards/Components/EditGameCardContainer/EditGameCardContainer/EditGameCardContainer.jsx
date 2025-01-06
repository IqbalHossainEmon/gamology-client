import { useEffect, useRef, useState } from 'react';
import GameCards from '../../../../../../../../../../Shared/GameCards/GameCards/GameCards';
import TextField from '../../../../../../../../../../Shared/TextField/TextField/TextField';
import NormalButtonWithEffects from '../../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameCardAddCard from '../Components/EditGameCardAddCard/EditGameCardAddCard';
import styles from './EditGameCardContainer.module.css';

const handleExtraCard = (width, margin, handleCLick) => (
	<EditGameCardAddCard width={width} margin={margin} onClick={handleCLick} />
);

function EditGameCardContainer({ defaultData, id, onClear, onDelete, onReset }) {
	const [cards, setCards] = useState(defaultData || { header: '', cards: [] });

	const handleCLick = card => {
		setCards(prev => ({ ...prev, cards: [...prev.cards, card] }));
	};

	const firstDefaultData = useRef(defaultData);

	useEffect(() => {
		setCards(defaultData);
	}, [defaultData]);

	return (
		<section className={styles.gameCard}>
			<GameCards
				customHeader={
					<div className={styles.header}>
						<TextField
							field='input'
							placeholder='Write the title'
							htmlFor={`header-of-${id}`}
							defaultValue={cards.header}
							setState={value => setCards(prev => ({ ...prev, header: value }))}
						/>
					</div>
				}
				items={cards.cards}
				extraCard={(width, margin) => handleExtraCard(width, margin, handleCLick)}
				scrollToLast
			/>
			<div className={styles.headerBtnContainer}>
				<NormalButtonWithEffects className={styles.btn} onClick={onClear} text='Clear' />
				<NormalButtonWithEffects className={styles.btn} onClick={onDelete} text='Delete' />
				<NormalButtonWithEffects
					className={styles.btn}
					onClick={() => {
						setCards(firstDefaultData.current);
						onReset(firstDefaultData.current);
					}}
					text='Reset'
				/>
			</div>
		</section>
	);
}
export default EditGameCardContainer;
