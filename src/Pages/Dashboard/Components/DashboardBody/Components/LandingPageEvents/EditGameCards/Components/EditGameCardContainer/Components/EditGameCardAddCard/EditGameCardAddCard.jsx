import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import useHoverTooltips from '../../../../../../../../../../../Utils/Hooks/useHoverTooltips';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import AddGameCardModalBody from '../../../../../../../Shared/AddGameCardModalBody/AddGameCardModalBody';
import styles from './EditGameCardAddCard.module.css';

function EditGameCardAddCard({ width, onClick }) {
	const btnRef = useRef(null);

	useHoverTooltips(btnRef, 'Add Game to the list');
	const setModal = useModal();

	return (
		<li
			className={`${styles.addGameCardContainer} hover-shadow`}
			style={{ width: `${width}px` }}
		>
			<div className={styles.addGameCard}>
				<button
					ref={btnRef}
					type='button'
					onClick={() => {
						setModal({
							title: 'Add Game to the list',
							body: (
								<h3 className={styles.title}>
									Search for the game you want to add to the list:{' '}
								</h3>
							),
							footer: <AddGameCardModalBody setModal={setModal} onClick={onClick} />,
						});
					}}
					className={styles.btn}
				>
					<div className={styles.plus} />
					<ButtonWaterEffect long background='rgba(255,255,255,0.3)' />
				</button>
			</div>
		</li>
	);
}
export default EditGameCardAddCard;
