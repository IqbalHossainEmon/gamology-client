import { useEffect, useState } from 'react';

import ErrorMessage from '../../../../../../../../../../../../../Shared/ErrorMessage/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';

import styles from './SelectionFieldWithErrorMessage.module.css';

function SelectionFieldWithErrorMessage({
	htmlFor,
	placeholder,
	list,
	name,
	setState,
	errorMessage,
	errorChange,
	handleCheck,
	className,
}) {
	const [errorShow, setErrorShow] = useState(false);

	useEffect(() => {
		if (errorChange && errorMessage) {
			setErrorShow(true);
		} else {
			setErrorShow(false);
		}
	}, [errorChange, errorMessage]);

	return (
		<div className={`${styles.selectionField}${className ? ` ${className}` : ''}`}>
			<SelectionField
				errorBorder={errorShow}
				htmlFor={htmlFor}
				list={list}
				propertyName={name}
				onFocusClick={() => {
					setErrorShow(false);
					if (handleCheck) {
						handleCheck();
					}
				}}
				placeholder={placeholder}
				setState={setState}
			/>
			<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
		</div>
	);
}
export default SelectionFieldWithErrorMessage;
