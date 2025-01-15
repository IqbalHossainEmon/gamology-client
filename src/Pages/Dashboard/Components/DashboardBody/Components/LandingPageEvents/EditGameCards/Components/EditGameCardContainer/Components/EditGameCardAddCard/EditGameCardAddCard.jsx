import { useEffect, useRef } from 'react';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import useTooltip from '../../../../../../../../../../../Utils/Hooks/useTooltip';
import EditGameCardAddCardBody from '../EditGameCardAddCardBody/EditGameCardAddCardBody';
import styles from './EditGameCardAddCard.module.css';

function EditGameCardAddCard({ width, margin, onClick }) {
	const btnRef = useRef(null);

	const setTooltip = useTooltip();
	const setModal = useModal();

	useEffect(() => {
		setTooltip(btnRef.current, 'Add Game to the list');
	}, [setTooltip, width]);

	return (
		<li
			className={`${styles.addGameCardContainer} hover-shadow`}
			style={{ width: `${width}px`, marginRight: `${margin}px` }}
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
							footer: (
								<EditGameCardAddCardBody setModal={setModal} onClick={onClick} />
							),
						});
					}}
					className={styles.btn}
				>
					<div className={styles.plus} />
				</button>
			</div>
		</li>
	);
}
export default EditGameCardAddCard;
