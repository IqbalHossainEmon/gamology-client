import { useState } from 'react';

import SelectionField from '../../../../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import useScreenWidth from '../../../../../../../../../../../../Utils/Hooks/useScreenWidth';

import styles from './EditAdaptiveGameFooterBodySelectionField.module.css';

function EditAdaptiveGameFooterBodySelectionField({
	data,
	setButtonNumber,
	dataHolder,
	errorMessage,
	getTypeOfFooter,
}) {
	const [height, setHeight] = useState(0);

	const { remHeightInPixels } = useScreenWidth();

	return (
		<div
			className={styles.editFooterHeaderContainer}
			style={{ height: `${height ? height / remHeightInPixels + 3.75 : 3.75}rem` }}
		>
			<SelectionField
				htmlFor='number-of-buttons'
				list={[1, 2, 'Price']}
				propertyName='Number of Buttons'
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
					const actualValue = val === 'Price' ? -1 : parseInt(val, 10);
					setButtonNumber(actualValue);
					errorMessage.current = getTypeOfFooter(actualValue);
					if (Array.isArray(dataHolder.current) && actualValue > 0) {
						if (dataHolder.current.length < actualValue) {
							dataHolder.current.push({
								text: '',
								link: '',
							});
						} else if (dataHolder.current.length > actualValue) {
							dataHolder.current.splice(actualValue);
						}
					} else {
						dataHolder.current = getTypeOfFooter(actualValue);
					}
				}}
			/>
		</div>
	);
}
export default EditAdaptiveGameFooterBodySelectionField;
