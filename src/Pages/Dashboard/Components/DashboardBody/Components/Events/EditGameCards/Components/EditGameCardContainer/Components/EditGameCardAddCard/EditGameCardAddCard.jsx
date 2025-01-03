import { useEffect, useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import useModal from '../../../../../../../../../../../Utils/Hooks/useModal';
import useTooltip from '../../../../../../../../../../../Utils/Hooks/useTooltip';
import EditGameCardAddCardBody from '../EditGameCardAddCardFooter/EditGameCardAddCardFooter';
import styles from './EditGameCardAddCard.module.css';

function EditGameCardAddCard({ width, margin, onClick }) {
	const btnRef = useRef(null);
	const waterEffectBtnRef = useRef(null);

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
							body: <EditGameCardAddCardBody />,
							footer: (
								<button
									className={styles.confirmBtn}
									onClick={() => {
										// onClick();
										setModal({
											title: null,
											body: null,
											footer: null,
										});
									}}
									ref={waterEffectBtnRef}
									type='button'
								>
									Submit
									<ButtonWaterEffect
										backGround='#3e9c35'
										btnRef={waterEffectBtnRef}
										long
									/>
								</button>
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
