import { useRef } from 'react';
import TypeableSelectionField from '../../../../../../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import useTextConverter from '../../../../../../../../../../../Utils/Hooks/useTextConverter';
import styles from './EditAdaptiveCardsLinkField.module.css';

function EditAdaptiveCardsLinkField({ index, link, setLink, blurSet }) {
	const eventRefs = useRef(null);

	const { convertNameToLink } = useTextConverter();

	if (!eventRefs.current) {
		eventRefs.current = {
			checkLinkStarValue: val => {
				const newValue = val;

				if (newValue?.toLowerCase().startsWith('/games/') && newValue.length > 7) {
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
			{/* only for frontend dev */}
			{/* when search it will show the games from backend but when an option clicked it will of course show the link */}
			<TypeableSelectionField
				placeholder="Enter main link (/games/'game_name' for games)"
				defaultValue={link}
				blurSet={blurSet}
				propertyName='name'
				name={`editAdaptiveCardLink${index}`}
				htmlFor={`editAdaptiveCardLink${index}`}
				/* only for frontend dev */
				// link conversion only for now, the link will be set from the backend with the game name
				setState={(val, isWithoutSelected) =>
					setLink(
						'link',
						isWithoutSelected ? val : `/games/${convertNameToLink(val.name)}`
					)
				}
				checkLinkStarValue={eventRefs.current.checkLinkStarValue}
				specialSetValueHandler={eventRefs.current.valueSetter}
				handleValueCheck={eventRefs.current.valueChecker}
				// errorMessage={errorMessage.current}
				// errorChange={errorChange}
			/>
		</div>
	);
}
export default EditAdaptiveCardsLinkField;
