import { useEffect, useRef } from 'react';

import TypeableSelectionField from '../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import useTextConverter from '../../../../../../Utils/Hooks/useTextConverter';

import styles from './SearchGamesOrWriteLink.module.css';

function SearchGamesOrWriteLink({
	defaultValue,
	setState = () => {},
	blurSet,
	errorChange,
	errorMessage,
	placeholder,
	propertyName,
	name,
	htmlFor,
	setHeight,
	outerSetValuePropertyName,
	valueUpdaterRef,
	valueResetRef,
}) {
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

	const valueUpdaterEventRef = useRef(null);

	useEffect(() => {
		if (valueUpdaterRef) {
			valueUpdaterRef.current = valueUpdaterEventRef.current;
			return () => {
				valueUpdaterRef.current = null;
			};
		}
	}, [valueUpdaterRef]);

	useEffect(() => {
		if (valueResetRef) {
			valueResetRef.current = () => {
				valueUpdaterEventRef.current(defaultValue);
			};
			return () => {
				valueResetRef.current = null;
			};
		}
	}, [defaultValue, valueResetRef]);

	return (
		<div className={styles.header}>
			{/* only for frontend dev */}
			{/* when search it will show the games from backend but when an option clicked it will of course show the link */}
			<TypeableSelectionField
				placeholder={placeholder}
				defaultValue={defaultValue}
				blurSet={blurSet}
				propertyName={propertyName}
				name={name}
				htmlFor={htmlFor}
				setHeight={setHeight}
				/* only for frontend dev */
				// link conversion only for now, the link will be set from the backend with the game name
				setState={(val, isWithoutSelected) =>
					setState(
						isWithoutSelected ? val : `/games/${convertNameToLink(val.name)}`,
						outerSetValuePropertyName
					)
				}
				checkLinkStarValue={eventRefs.current.checkLinkStarValue}
				specialSetValueHandler={eventRefs.current.valueSetter}
				handleValueCheck={eventRefs.current.valueChecker}
				errorMessage={errorMessage}
				errorChange={errorChange}
				valueUpdaterRef={valueUpdaterEventRef}
			/>
		</div>
	);
}
export default SearchGamesOrWriteLink;
