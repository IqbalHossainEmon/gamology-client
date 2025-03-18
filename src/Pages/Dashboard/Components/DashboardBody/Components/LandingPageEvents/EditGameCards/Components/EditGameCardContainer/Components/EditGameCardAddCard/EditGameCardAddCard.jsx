import { useRef } from 'react';
import RippleEffect from '../../../../../../../../../../../Shared/RippleEffect/RippleEffect';
import useHoverTooltips from '../../../../../../../../../../../Utils/Hooks/useHoverTooltips';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import AddGameCardModalFooter from '../../../../../../../Shared/AddGameCardModalFooter/AddGameCardModalFooter';
import styles from './EditGameCardAddCard.module.css';

function EditGameCardAddCard({ width, onClick }) {
	const btnRef = useRef(null);

	useHoverTooltips(btnRef, 'Add Game to the list');
	const { setContent } = useModal();

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
						setContent({
							title: 'Add Game to the list',
							body: (
								<p className={styles.title}>
									Search for the game you want to add to the list:{' '}
								</p>
							),
							footer: <AddGameCardModalFooter onClick={onClick} />,
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
