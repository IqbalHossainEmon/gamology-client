import { useEffect, useRef, useState } from 'react';
import SelectionField from '../../../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import TextField from '../../../../../../../../../../../Shared/TextField/TextField/TextField';
import useScreenWidth from '../../../../../../../../../../../Utils/Hooks/useScreenWidth';
import styles from './EditAdaptiveGameFooterBody.module.css';

function EditAdaptiveGameFooterBody({ index, data, btnRef }) {
	const [height, setHeight] = useState(0);

	const [buttonNumber, setButtonNumber] = useState(
		data.footer ? (Array.isArray(data.footer) ? data.footer.length : -1) : 0
	);

	let buttonElement = null;
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
			buttonElement = Array.from({ length: buttonNumber }, (_, i) => (
				<div className={styles.editFooterButton} key={i}>
					<TextField
						// errorChange={errorChange}
						// errorMessage={errorMessage}
						field='input'
						htmlFor={`button-text-${i}`}
						placeholder={`Button ${i + 1} Text`}
						defaultValue={data.footer ? data.footer[i]?.text : ''}
						setState={val => console.log(val)}
						type='text'
					/>
					<TextField
						// errorChange={errorChange}
						// errorMessage={errorMessage}
						field='input'
						htmlFor={`button-link-${i}`}
						placeholder={`Button ${i + 1} Link`}
						defaultValue={data.footer ? data.footer[i]?.link : ''}
						setState={val => console.log(val)}
						type='text'
					/>
				</div>
			));
			break;
		default:
	}

	const eventRefs = useRef(null);
	if (!eventRefs.current) {
		eventRefs.current = {
			onClick: () => {
				console.log(`Button clicked for card ${index + 1}`);
			},
		};
	}

	const { remHeightInPixels } = useScreenWidth();

	useEffect(() => {
		const btn = btnRef.current;
		if (btn) {
			btn.addEventListener('click', eventRefs.current.onClick);
		}
		return () => {
			if (btn) {
				btn.removeEventListener('click', eventRefs.current.onClick);
			}
		};
	}, [btnRef]);

	return (
		<>
			<p className={styles.editFooterHeader}>Edit the footer of card {index + 1}?</p>
			<div
				className={styles.editFooterHeaderContainer}
				style={{ height: `${height ? height / remHeightInPixels + 3.75 : 3.75}rem` }}
			>
				<SelectionField
					htmlFor='number-of-buttons'
					list={[1, 2, 'Price']}
					name='Number of Buttons'
					setHeight={setHeight}
					defaultValue={
						data.footer
							? Array.isArray(data.footer)
								? data.footer.length === 0
									? 'None'
									: data.footer.length
								: 'Price'
							: 'None'
					}
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
		</>
	);
}
export default EditAdaptiveGameFooterBody;
