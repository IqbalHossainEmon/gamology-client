import { useRef } from 'react';
import RippleEffect from '../../../../../../../../../../../Shared/RippleEffect/RippleEffect';
import useHoverTooltips from '../../../../../../../../../../../Utils/Hooks/useHoverTooltips';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import AddGameCardModalFooter from '../../../../../../../Shared/AddGameCardModalFooter/AddGameCardModalFooter';

import styles from './EditGameShowCaseExtraCard.module.css';

function EditGameShowCaseExtraCard({ onclick }) {
	const btnRef = useRef(null);

	const { setContent } = useModal();

	useHoverTooltips(btnRef, 'Add Game to the list');

	return (
		<li>
			<button
				type='button'
				ref={btnRef}
				className={styles.extraCard}
				onClick={e => {
					setContent({
						title: 'Add Game to the list',
						body: (
							<p className={styles.title}>
								Search for the game you want to add to the list:{' '}
							</p>
						),
						footer: <AddGameCardModalFooter onClick={onclick} />,
						e,
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
