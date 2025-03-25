import { useEffect, useRef, useState } from 'react';
import TextField from '../../../../../../../../../../../../Shared/TextField/TextField/TextField';
import TypeableSelectionField from '../../../../../../../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import useObjectUtilities from '../../../../../../../../../../../../Utils/Hooks/useObjectUtilities';
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
	const { cloneObject } = useObjectUtilities();

	const [buttonNumber, setButtonNumber] = useState(
		data.footer ? (Array.isArray(data.footer) ? data.footer.length : -1) : 0
	);

	const [errorChange, setErrorChange] = useState(0);
	const errorMessage = useRef(getTypeOfFooter(buttonNumber));

	const dataHolder = useRef(cloneObject(data.footer));

	const eventRefs = useRef(null);
	if (!eventRefs.current) {
		eventRefs.current = {
			onClick: () => {
				let isThereError = false;
				if (Array.isArray(dataHolder.current)) {
					dataHolder.current.forEach((item, i) => {
						if (!item.text) {
							errorMessage.current[i].text = `Button ${i + 1} text is required.`;
						} else {
							errorMessage.current[i].text = '';
						}
						if (!item.link) {
							errorMessage.current[i].link = `Button ${i + 1} link is required.`;
						} else {
							errorMessage.current[i].link = '';
						}
					});
				} else {
					if (!dataHolder.current.discount) {
						errorMessage.current.regular = 'Regular price is required.';
						isThereError = true;
					} else {
						errorMessage.current.regular = '';
					}
					if (!dataHolder.current.regular) {
						errorMessage.current.discount = 'Discounted price is required.';
						isThereError = true;
					} else {
						errorMessage.current.discount = '';
					}
				}
				if (isThereError) setErrorChange(prev => prev + 1);
				console.log(errorMessage.current);
			},
			setValue: (val, nameWithIndex) => {
				const [name, innerIndex] = nameWithIndex ? nameWithIndex.split('-') : [];
				if (innerIndex) {
					dataHolder.current[innerIndex][name] = val;
				} else {
					dataHolder.current[name] = val;
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
						defaultValue={data.footer ? dataHolder.current.regular : ''}
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
						defaultValue={data.footer ? dataHolder.current.discount : ''}
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
						defaultValue={data.footer ? dataHolder.current[i]?.text : ''}
						setState={eventRefs.current.setValue}
						type='text'
						name={`text-${i}`}
					/>
					<TypeableSelectionField
						blurSet
						propertyName='name'
						checkLinkStarValue={eventRefs.current.checkLinkStarValue}
						specialSetValueHandler={eventRefs.current.valueSetter}
						handleValueCheck={eventRefs.current.valueChecker}
						errorChange={errorChange}
						errorMessage={errorMessage.current[i].link}
						field='input'
						htmlFor={`button-link-${i}`}
						placeholder={`Button ${i + 1} Link`}
						defaultValue={data.footer ? dataHolder.current[i]?.link : ''}
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
