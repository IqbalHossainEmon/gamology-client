import { useState } from 'react';
import AddToWishlistButton from '../../../../../../../../../../Shared/AddToWishlistButton/AddToWishlistButton';
import GamesShowcase from '../../../../../../../../../../Shared/GamesShowcase/GamesShowcase/GamesShowcase';
import useModal from '../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import NormalButtonWithEffects from '../../../../../../Shared/NormalButtonWithEffects/NormalButtonWithEffects';
import EditGameShowCaseConfirmModal from '../Components/EditGameShowCaseConfirmModal/EditGameShowCaseConfirmModal';
import EditGameShowCaseExtraCard from '../Components/EditGameShowCaseExtraCard/EditGameShowCaseExtraCard';
import styles from './EditGameShowCase.module.css';

function extraCard(index, onclick) {
	return <EditGameShowCaseExtraCard index={index} onclick={game => onclick(index, game)} />;
}

function getHoverCard(game, setHoverShow, shouldHideRef) {
	return (
		<AddToWishlistButton
			game={game}
			setHoverShow={setHoverShow}
			shouldHideRef={shouldHideRef}
		/>
	);
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

	const setModal = useModal();

	return (
		<div className={styles.editGameShowCase}>
			<GamesShowcase
				getHoverCard={getHoverCard}
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
				<NormalButtonWithEffects
					text='Delete'
					onClick={() =>
						setModal({
							title: 'Delete Game Showcase',
							body: <p>Are you sure you want to delete this game showcase?</p>,
							footer: (
								<EditGameShowCaseConfirmModal
									onConfirm={() => {
										setModal({
											title: null,
											body: null,
											footer: null,
										});
										onDelete();
									}}
								/>
							),
						})
					}
				/>
			</div>
		</div>
	);
}
export default EditGameShowCase;
