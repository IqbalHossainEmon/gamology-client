import { useRef, useState } from 'react';
import TextField from '../../../../../../../../../../../../../Shared/TextField/TextField/TextField';
import useModal from '../../../../../../../../../../../../../Utils/Hooks/useModal';
import useToast from '../../../../../../../../../../../../../Utils/Hooks/useToast';
import styles from './AllGamesPriceEditModal.module.css';

function AllGamesPriceEditModal({ price }) {
	const newPrice = useRef(null);

	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: '',
	});

	const { setToast } = useToast('price');

	const { hideModal } = useModal();

	const handleSubmit = () => {
		if (newPrice.current) {
			if (typeof price === 'object') {
				if (price.discount > newPrice.current) {
					setError(prev => ({
						errorChange: prev.errorChange + 1,
						errorMessage: 'New price is less than discount price',
					}));
					return;
				}
			} else if (newPrice.current === price) {
				setError(prev => ({
					errorChange: prev.errorChange + 1,
					errorMessage: 'Price is same',
				}));
				return;
			}
			if (!/^\d+(\.\d{1})?$/.test(newPrice.current)) {
				setError(prev => ({
					errorChange: prev.errorChange + 1,
					errorMessage: 'Invalid price',
				}));
				return;
			}
			// API call to update price

			setToast({
				title: 'Price Updated',
				message: 'Price has been updated successfully',
				type: 'success',
			});
			hideModal();
		} else {
			setError(prev => ({
				errorChange: prev.errorChange + 1,
				errorMessage: 'Enter new price',
			}));
		}
	};

	return (
		<div className={styles.priceChange}>
			<div className={styles.inputContainer}>
				<TextField
					className={styles.input}
					defaultValue={typeof price === 'object' ? price.regular : `${price}`}
					enabled={false}
					field='input'
					htmlFor='previous_price'
					placeholder='Previous Price'
				/>
				<div className={styles.arrowIcon}>
					<svg
						fill='#ffffff00'
						stroke='#ffffff00'
						strokeWidth='0.00512'
						version='1.1'
						viewBox='0 0 512.00 512.00'
						xmlSpace='preserve'
						xmlns='http://www.w3.org/2000/svg'
					>
						<g id='SVGRepo_bgCarrier' strokeWidth='0' />
						<g
							id='SVGRepo_tracerCarrier'
							stroke='#CCCCCC'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.024'
						/>
						<g id='SVGRepo_iconCarrier'>
							<path
								d='M250.238,39.428c-13.664,13.664-13.664,35.818,0,49.482L382.34,221.011H45.189 c-19.324,0-34.989,15.665-34.989,34.989c0,19.324,15.665,34.989,34.989,34.989H382.34L250.238,423.091 c-13.664,13.664-13.664,35.818,0,49.482c13.664,13.664,35.819,13.664,49.482,0l191.832-191.832 c6.832-6.832,10.248-15.786,10.248-24.741s-3.416-17.909-10.248-24.741L299.721,39.428 C286.057,25.763,263.902,25.763,250.238,39.428z'
								fill='#3e9c35'
							/>

							<g>
								<path
									d='M274.979,493.021c-12.07,0-23.418-4.7-31.953-13.235c-17.618-17.619-17.618-46.288,0-63.907 l114.69-114.69H45.189C20.271,301.189,0,280.918,0,256.001s20.271-45.189,45.189-45.189h312.528l-114.69-114.69 c-17.618-17.619-17.618-46.288,0-63.907c8.535-8.535,19.883-13.236,31.953-13.236c12.071,0,23.418,4.7,31.953,13.236 l191.833,191.832C507.3,232.583,512,243.931,512,256.001s-4.7,23.417-13.235,31.953L306.933,479.786 C298.397,488.321,287.049,493.021,274.979,493.021z M45.189,231.21c-13.67,0-24.79,11.121-24.79,24.79 c0,13.669,11.12,24.79,24.79,24.79H382.34c4.126,0,7.844,2.486,9.422,6.296c1.579,3.811,0.706,8.198-2.21,11.115L257.45,430.303 c-9.667,9.666-9.667,25.393,0,35.059c4.682,4.682,10.907,7.261,17.529,7.261c6.622,0,12.847-2.578,17.529-7.261l191.833-191.833 c4.681-4.681,7.26-10.907,7.26-17.528c0-6.621-2.578-12.847-7.261-17.529L292.508,46.639c-4.682-4.682-10.907-7.261-17.529-7.261 c-6.622,0-12.847,2.578-17.529,7.261c-9.667,9.666-9.667,25.393,0,35.059L389.55,213.799c2.916,2.917,3.789,7.304,2.21,11.115 c-1.578,3.811-5.296,6.296-9.422,6.296H45.189z'
									fill='#3e9c35'
								/>

								<path
									d='M370.231,160.638c-2.611,0-5.22-0.995-7.212-2.987l-3.06-3.06c-3.983-3.983-3.983-10.441,0-14.425 c3.984-3.983,10.44-3.983,14.425,0l3.06,3.06c3.983,3.983,3.983,10.441,0,14.425C375.451,159.643,372.842,160.638,370.231,160.638z '
									fill='#3e9c35'
								/>

								<path
									d='M473.753,264.16c-2.611,0-5.22-0.995-7.212-2.987l-80.574-80.574 c-3.983-3.983-3.983-10.441,0-14.425c3.984-3.983,10.44-3.983,14.425,0l80.574,80.574c3.983,3.983,3.983,10.441,0,14.425 C478.973,263.164,476.364,264.16,473.753,264.16z'
									fill='#3e9c35'
								/>
							</g>
						</g>
					</svg>
				</div>
				<TextField
					className={styles.input}
					field='number'
					pattern={/^$|^\d{1,}(\.\d{0,2})?$/}
					htmlFor='new_price'
					placeholder='New Price'
					setState={val => {
						newPrice.current = val;
					}}
					errorChange={errorChange}
					errorMessage={errorMessage}
				/>
			</div>
			<button className={styles.submitBtn} onClick={handleSubmit} type='button'>
				Submit
			</button>
		</div>
	);
}
export default AllGamesPriceEditModal;
