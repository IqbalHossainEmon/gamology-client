import { useState } from 'react';
import SelectionField from '../../../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import TextField from '../../../../../../../../../../../Shared/TextField/TextField/TextField';
import ButtonWithRipple from '../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import styles from './EditAdaptiveGameFooterFooter.module.css';

function EditAdaptiveGameFooterFooter({ data }) {
	const [height, setHeight] = useState(0);

	const [buttonNumber, setButtonNumber] = useState(
		data.footer ? (Array.isArray(data.footer) ? data.footer.length : -1) : 0
	);

	let buttonElement = null;

	console.log(data);

	switch (buttonNumber) {
		case -1:
			buttonElement = (
				<div className={styles.editFooterButton}>
					<TextField
						field='input'
						htmlFor='regular-price'
						placeholder='Regular Price'
						defaultValue={data.footer ? data.footer.regular : ''}
						setState={val => console.log(val)}
						type='text'
					/>
					<TextField
						field='input'
						htmlFor='discounted-price'
						placeholder='Discounted Price'
						defaultValue={data.footer ? data.footer.discount : ''}
						setState={val => console.log(val)}
						type='text'
					/>
				</div>
			);
			break;
		case 1:
		case 2:
			buttonElement = Array.from({ length: buttonNumber }, (_, index) => (
				<div className={styles.editFooterButton} key={index}>
					<TextField
						// errorChange={errorChange}
						// errorMessage={errorMessage}
						field='input'
						htmlFor={`button-text-${index}`}
						placeholder={`Button ${index + 1} Text`}
						defaultValue={data.footer ? data.footer[index]?.text : ''}
						setState={val => console.log(val)}
						type='text'
					/>
					<TextField
						// errorChange={errorChange}
						// errorMessage={errorMessage}
						field='input'
						htmlFor={`button-link-${index}`}
						placeholder={`Button ${index + 1} Link`}
						defaultValue={data.footer ? data.footer[index]?.link : ''}
						setState={val => console.log(val)}
						type='text'
					/>
				</div>
			));
			break;
		default:
	}

	return (
		<>
			<div
				className={styles.editFooterHeaderContainer}
				style={{ height: `${height ? height / 16 + 3.75 : 3.75}rem` }}
			>
				<SelectionField
					htmlFor='number-of-buttons'
					list={[1, 2, 'Price']}
					name='Number of Buttons'
					setHeight={setHeight}
					defaultValue={
						data.footer
							? Array.isArray(data.footer)
								? data.footer.length
								: 'Price'
							: 'None'
					}
					none
					placeholder='Select Number of Buttons'
					setState={val => {
						if (val === 'Price') {
							setButtonNumber(-1);
						} else {
							setButtonNumber(val);
						}
					}}
				/>
			</div>
			{buttonElement}
			<div className={styles.editFooterButtons}>
				<ButtonWithRipple>Save</ButtonWithRipple>
			</div>
		</>
	);
}
export default EditAdaptiveGameFooterFooter;
