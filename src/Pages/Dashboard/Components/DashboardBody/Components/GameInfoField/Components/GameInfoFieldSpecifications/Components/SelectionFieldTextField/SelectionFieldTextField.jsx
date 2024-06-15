import { useEffect, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import TextField from '../../../../../../../../../../Shared/TextField/TextField';
import styles from './SelectionFieldTextField.module.css';

function SelectionFieldTextField({
	parentIndex,
	name,
	length,
	i,
	index,
	handleSetState,
	listArr,
	selectedKeys,
	errorMessage,
	parentErrorShow,
	errorChange,
	setHideParentErrorShow,
	enabled,
	defaultData,
}) {
	const [errorShow, setErrorShow] = useState(Boolean(errorMessage));

	useEffect(() => {
		if (errorChange && errorMessage) {
			setErrorShow(true);
		}
	}, [errorChange, errorMessage]);

	const handleHideErrorShow = () => {
		if (errorShow) {
			setErrorShow(false);
		}
	};

	return (
		<>
			<div className={styles.specsContainer}>
				<div className={styles.selectionField}>
					<SelectionField
						enabled={enabled}
						htmlFor={`${parentIndex}${name}${length}${i}${index}`}
						list={listArr.filter(la => !selectedKeys.includes(la))}
						name="Key Type"
						onFocusClick={() => setHideParentErrorShow()}
						placeholder="Required"
						setState={value => {
							handleSetState(value, i, index, true);
						}}
						{...(defaultData && { defaultValue: defaultData.key })}
					/>
				</div>

				<div className={styles.textField}>
					<TextField
						enabled={enabled}
						field="input"
						htmlFor={`${name}_${length}`}
						onFocusClick={() => handleHideErrorShow()}
						placeholder="Required Specs"
						setState={value => {
							handleSetState(value, i, index);
						}}
						{...(defaultData && { defaultValue: defaultData.value })}
					/>
				</div>
			</div>
			<ErrorMessage enable={!parentErrorShow && errorShow} errorMessage={errorMessage} />
		</>
	);
}
export default SelectionFieldTextField;
