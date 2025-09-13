import { useRef } from 'react';
import RippleEffect from '../../../../../../../../../../../Shared/RippleEffect/RippleEffect';
import useHoverTooltips from '../../../../../../../../../../../Utils/Hooks/useHoverTooltips';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import ButtonWithRipple from '../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import GameCardModalBody from '../../../../../../../Shared/GameCardModalBody/GameCardModalBody';
import styles from './EditGameCardAddCard.module.css';

function EditGameCardAddCard({ width, onClick }) {
	const btnRef = useRef(null);

	useHoverTooltips(btnRef, 'Add Game to the list');
	const { setContent } = useModal();

	const modalButtonRef = useRef(null);

	return (
		<li
			className={`${styles.addGameCardContainer} hover-shadow`}
			style={{ width: `${width}px` }}
		>
			<div className={styles.addGameCard}>
				<button
					ref={btnRef}
					type='button'
					onClick={e => {
						setContent({
							title: 'Add Game to the list',
							body: (
								<>
									<p className={styles.title}>
										Search for the game you want to add to the list:{' '}
									</p>
									<GameCardModalBody
										handleClick={onClick}
										btnRef={modalButtonRef}
									/>
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
					className={styles.btn}
				>
					<div className={styles.plus} />
					<RippleEffect long background='rgba(255,255,255,0.3)' />
				</button>
			</div>
		</li>
	);
}
export default EditGameCardAddCard;
