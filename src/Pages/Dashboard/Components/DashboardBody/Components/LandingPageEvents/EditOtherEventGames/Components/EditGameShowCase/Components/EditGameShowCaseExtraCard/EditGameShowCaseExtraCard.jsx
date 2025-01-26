import ButtonWaterEffect from '../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import AddGameCardModalBody from '../../../../../../../Shared/AddGameCardModalBody/AddGameCardModalBody';

import styles from './EditGameShowCaseExtraCard.module.css';

function EditGameShowCaseExtraCard({ onclick }) {
	const setModal = useModal();

	return (
		<li>
			<button
				type='button'
				className={styles.extraCard}
				onClick={() => {
					setModal({
						title: 'Add Game to the list',
						body: (
							<h3 className={styles.title}>
								Search for the game you want to add to the list:{' '}
							</h3>
						),
						footer: <AddGameCardModalBody setModal={setModal} onClick={onclick} />,
					});
				}}
			>
				<span className={styles.plus} />
				<ButtonWaterEffect long background='rgba(255,255,255,0.3)' />
			</button>
		</li>
	);
}
export default EditGameShowCaseExtraCard;
