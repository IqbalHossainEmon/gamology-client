import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import TextField from '../../../../../../../../../../../../../Shared/TextField/TextField/TextField';
import useModal from '../../../../../../../../../../../../../Utils/Hooks/useModal';
import useToast from '../../../../../../../../../../../../../Utils/Hooks/useToast';
import styles from './AllGamesSalesModal.module.css';

function AllGamesSalesModal({ price: prevPrice }) {
	const price = useRef(null);
	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: '',
	});

	const btnRef = useRef(null);

	const setModal = useModal();

	const { setToast } = useToast();

	const handleSubmit = () => {
		if (/^\d+(\.\d{1})?$/.test(price.current)) {
			// API call to sale update game game
			if (price.current >= prevPrice) {
				setError(prev => ({
					errorChange: prev.errorChange + 1,
					errorMessage: 'Sales price should be less than the previous price',
				}));
				return;
			}
			console.log("Game's sales price updated");

			setToast({
				title: "Game's sales price updated",
				message: "Game's sales price has been updated successfully",
				type: 'success',
			});

			setModal({
				title: null,
				body: null,
				footer: null,
				triggerContainer: null,
			});
		} else {
			setError(prev => ({
				errorChange: prev.errorChange + 1,
				errorMessage: 'Enter a valid price',
			}));
		}
	};
	return (
		<div className={styles.deleteModal}>
			<TextField
				className={styles.textField}
				errorChange={errorChange}
				errorMessage={errorMessage}
				field='number'
				htmlFor='sales'
				pattern={/^$|^\d{1,}(\.\d{0,2})?$/}
				placeholder='What is the sales price?'
				setState={val => {
					price.current = val;
				}}
				type='text'
			/>
			<button ref={btnRef} className={styles.btn} onClick={handleSubmit} type='button'>
				Submit Price
				<ButtonWaterEffect btnRef={btnRef} long />
			</button>
		</div>
	);
}
export default AllGamesSalesModal;
