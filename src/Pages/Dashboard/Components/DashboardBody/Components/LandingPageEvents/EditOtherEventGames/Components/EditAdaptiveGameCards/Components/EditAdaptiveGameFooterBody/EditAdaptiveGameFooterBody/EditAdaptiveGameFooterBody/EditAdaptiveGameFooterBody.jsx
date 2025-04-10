import { useEffect, useRef, useState } from 'react';
import TextField from '../../../../../../../../../../../../../Shared/TextField/TextField/TextField';
import useObjectUtilities from '../../../../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import EditAdaptiveGameFooterBodySelectionField from '../../EditAdaptiveGameFooterBodySelectionField/EditAdaptiveGameFooterBodySelectionField';
import EditAdaptiveGamesFooterLinkField from '../Components/EditAdaptiveGamesFooterLinkField/EditAdaptiveGamesFooterLinkField';
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

function EditAdaptiveGameFooterBody({
	index,
	data,
	btnRef,
	hideModal,
	setAdaptiveGameCards,
	setFooterMainData,
}) {
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
							isThereError = true;
						} else {
							errorMessage.current[i].text = '';
						}
						if (!item.link) {
							errorMessage.current[i].link = `Button ${i + 1} link is required.`;
							isThereError = true;
						} else {
							errorMessage.current[i].link = '';
						}
					});
				} else {
					if (!dataHolder.current.regular) {
						errorMessage.current.regular = 'Regular price is required.';
						isThereError = true;
					} else {
						errorMessage.current.regular = '';
					}
					if (!dataHolder.current.discount) {
						errorMessage.current.discount = 'Discounted price is required.';
						isThereError = true;
					} else {
						errorMessage.current.discount = '';
					}
				}
				if (isThereError) setErrorChange(prev => prev + 1);
				else {
					// backend call to save the footer data
					hideModal();
					setAdaptiveGameCards(prev => {
						const newAdaptiveGameCards = cloneObject(prev);
						newAdaptiveGameCards[index].footer = cloneObject(dataHolder.current);
						return newAdaptiveGameCards;
					});
					setFooterMainData(cloneObject(dataHolder.current), 'footer', index);
				}
			},
			setValue: (val, nameWithIndex) => {
				const [name, innerIndex] = nameWithIndex ? nameWithIndex.split('-') : [];
				if (innerIndex) {
					if (!dataHolder.current[innerIndex]) dataHolder.current[innerIndex] = {};
					dataHolder.current[innerIndex][name] = val;
				} else {
					if (Array.isArray(dataHolder.current)) dataHolder.current = {};
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
						propertyName='regular'
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
						propertyName='discount'
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
						propertyName={`text-${i}`}
					/>
					<EditAdaptiveGamesFooterLinkField
						i={i}
						data={data}
						dataHolder={dataHolder}
						eventRefs={eventRefs}
						errorChange={errorChange}
						errorMessage={errorMessage}
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
			return () => {
				btn.removeEventListener('click', eventRefs.current.onClick);
			};
		}
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
