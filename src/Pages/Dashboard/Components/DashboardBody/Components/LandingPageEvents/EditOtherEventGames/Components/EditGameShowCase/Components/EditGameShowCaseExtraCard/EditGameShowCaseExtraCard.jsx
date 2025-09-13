import { useRef } from 'react';
import RippleEffect from '../../../../../../../../../../../Shared/RippleEffect/RippleEffect';
import useHoverTooltips from '../../../../../../../../../../../Utils/Hooks/useHoverTooltips';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';

import ButtonWithRipple from '../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import GameCardModalBody from '../../../../../../../Shared/GameCardModalBody/GameCardModalBody';
import styles from './EditGameShowCaseExtraCard.module.css';

function EditGameShowCaseExtraCard({ onclick }) {
	const btnRef = useRef(null);

	const { setContent } = useModal();

	useHoverTooltips(btnRef, 'Add Game to the list');

	const modalButtonRef = useRef(null);

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
							<>
								<p className={styles.title}>
									Search for the game you want to add to the list:{' '}
								</p>
								<GameCardModalBody handleClick={onclick} btnRef={modalButtonRef} />
							</>
						),
						footer: (
							<ButtonWithRipple
								containerClassName={styles.confirmBtnContainer}
								className={styles.confirmBtn}
								long
								rippleColor='#3e9c35'
								btnRef={modalButtonRef}
							>
								Submit
							</ButtonWithRipple>
						),
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
