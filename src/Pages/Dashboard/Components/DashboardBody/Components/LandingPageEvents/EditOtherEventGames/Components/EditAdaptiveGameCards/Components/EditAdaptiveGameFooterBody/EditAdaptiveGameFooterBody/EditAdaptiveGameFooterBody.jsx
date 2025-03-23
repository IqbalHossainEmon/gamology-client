import { useEffect, useRef, useState } from 'react';
import TextField from '../../../../../../../../../../../../Shared/TextField/TextField/TextField';
import EditAdaptiveGameFooterBodySelectionField from '../EditAdaptiveGameFooterBodySelectionField/EditAdaptiveGameFooterBodySelectionField';
import styles from './EditAdaptiveGameFooterBody.module.css';

const getTypeOfFooter = footer => {
	switch (footer) {
		case -1:
			return {
				regular: '',
				discount: '',
			};
		case 1:
		case 2:
			return Array.from({ length: footer }, () => ({
				text: '',
				link: '',
			}));
		default:
			return { message: 'Please select a footer type.' };
	}
};

function EditAdaptiveGameFooterBody({ index, data, btnRef }) {
	const [buttonNumber, setButtonNumber] = useState(
		data.footer ? (Array.isArray(data.footer) ? data.footer.length : -1) : 0
	);

	const [errorChange, setErrorChange] = useState(0);
	const errorMessage = useRef(getTypeOfFooter(buttonNumber));

	const dataHolder = useRef(data.footer);

	const eventRefs = useRef(null);
	if (!eventRefs.current) {
		eventRefs.current = {
			onClick: () => {},
			setValue: (val, name) => {
				if (Array.isArray(dataHolder.current)) {
					console.log(dataHolder.current);
				} else {
					console.log(dataHolder.current);
				}
			},
		};
	}

	let fieldElements = null;

	switch (buttonNumber) {
		case -1:
			fieldElements = (
				<div className={styles.editFooterButton}>
					<TextField
						field='input'
						htmlFor='regular-price'
						errorChange={errorChange}
						errorMessage={errorMessage.current.regular}
						placeholder='Regular Price'
						defaultValue={data.footer ? data.footer.regular : ''}
						setState={eventRefs.current.setValue}
						type='text'
						name='regular'
					/>
					<TextField
						field='input'
						errorChange={errorChange}
						errorMessage={errorMessage.current.discount}
						htmlFor='discounted-price'
						placeholder='Discounted Price'
						defaultValue={data.footer ? data.footer.discount : ''}
						setState={eventRefs.current.setValue}
						type='text'
						name='discounted'
					/>
				</div>
			);
			break;
		case 1:
		case 2:
			fieldElements = Array.from({ length: buttonNumber }, (_, i) => (
				<div className={styles.editFooterButton} key={i}>
					<TextField
						errorChange={errorChange}
						errorMessage={errorMessage.current[i].text}
						field='input'
						htmlFor={`button-text-${i}`}
						placeholder={`Button ${i + 1} Text`}
						defaultValue={data.footer ? data.footer[i]?.text : ''}
						setState={eventRefs.current.setValue}
						type='text'
						name={`text-${i}`}
					/>
					<TextField
						errorChange={errorChange}
						errorMessage={errorMessage.current[i].link}
						field='input'
						htmlFor={`button-link-${i}`}
						placeholder={`Button ${i + 1} Link`}
						defaultValue={data.footer ? data.footer[i]?.link : ''}
						setState={eventRefs.current.setValue}
						type='text'
						name={`link-${i}`}
					/>
				</div>
			));
			break;
		default:
	}

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
			<EditAdaptiveGameFooterBodySelectionField
				data={data}
				setButtonNumber={setButtonNumber}
				dataHolder={dataHolder}
				errorMessage={errorMessage}
				getTypeOfFooter={getTypeOfFooter}
			/>
			{fieldElements}
		</>
	);
}
export default EditAdaptiveGameFooterBody;
