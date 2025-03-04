import { useRef } from 'react';
import TypeableSelectionField from '../../../../../../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import useTextConverter from '../../../../../../../../../../../Utils/Hooks/useTextConverter';
import styles from './EditAdaptiveCardsLinkField.module.css';

function EditAdaptiveCardsLinkField({ index, link }) {
	const eventRefs = useRef(null);

	const { convertNameToLink } = useTextConverter();

	if (!eventRefs.current) {
		eventRefs.current = {
			valueSlicer: val => {
				const newValue = val;

				if (newValue?.toLowerCase().startsWith('/games/')) {
					return false;
				}
				return true;
			},
			valueSetter: val => `/games/${convertNameToLink(val)}`,
			valueChecker: val => {
				const newValue = val;
				if (newValue?.toLowerCase().startsWith('/games/')) {
					return val.slice(7);
				}
				return val;
			},
		};
	}

	return (
		<div className={styles.header}>
			<TypeableSelectionField
				placeholder="Enter main link (/games/'game_name' for games)"
				defaultValue={link}
				propertyName='name'
				htmlFor={`editAdaptiveCardLink${index}`}
				setState={val => {
					console.log(val);
				}}
				handleListHide={eventRefs.current.valueSlicer}
				specialSetValueHandler={eventRefs.current.valueSetter}
				specialValueHandler={eventRefs.current.valueChecker}
				// errorMessage={errorMessage.current}
				// errorChange={errorChange}
			/>
		</div>
	);
}
export default EditAdaptiveCardsLinkField;
