import { useState } from 'react';

import SearchGamesOrWriteLink from '../../../../../../../../../../Shared/SearchGamesOrWriteLink/SearchGamesOrWriteLink';

import styles from './EditAdaptiveGamesFooterLinkField.module.css';

function EditAdaptiveGamesFooterLinkField({
	i,
	data,
	dataHolder,
	eventRefs,
	errorChange,
	errorMessage,
}) {
	const [height, setHeight] = useState(0);

	return (
		<div
			className={styles.editAdaptiveGamesFooterLinkField}
			style={{ height: height ? `${height + 3.75}rem` : `3.75rem` }}
		>
			<SearchGamesOrWriteLink
				setHeight={setHeight}
				link='/'
				setState={eventRefs.current.setValue}
				blurSet
				errorChange={errorChange}
				errorMessage={errorMessage.current[i].link}
				htmlFor={`button-link-${i}`}
				placeholder={`Button ${i + 1} Link ("/games/game_name" for games)`}
				defaultValue={data.footer ? dataHolder.current[i]?.link : ''}
				name='button-link'
				propertyName='name'
				outerSetValuePropertyName={`link-${i}`}
			/>
		</div>
	);
}
export default EditAdaptiveGamesFooterLinkField;
