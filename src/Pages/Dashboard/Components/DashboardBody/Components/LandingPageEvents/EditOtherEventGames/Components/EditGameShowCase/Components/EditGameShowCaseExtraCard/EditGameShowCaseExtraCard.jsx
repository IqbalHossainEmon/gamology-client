import { useRef } from 'react';
import RippleEffect from '../../../../../../../../../../../Shared/RippleEffect/RippleEffect';
import useHoverTooltips from '../../../../../../../../../../../Utils/Hooks/useHoverTooltips';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import AddGameCardModalBody from '../../../../../../../Shared/AddGameCardModalBody/AddGameCardModalBody';

import styles from './EditGameShowCaseExtraCard.module.css';

function EditGameShowCaseExtraCard({ onclick }) {
	const setModal = useModal();

	const btnRef = useRef(null);

	useHoverTooltips(btnRef, 'Add Game to the list');

	return (
		<li>
			<button
				type='button'
				ref={btnRef}
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
				<RippleEffect long background='rgba(255,255,255,0.3)' />
			</button>
		</li>
	);
}
export default EditGameShowCaseExtraCard;
