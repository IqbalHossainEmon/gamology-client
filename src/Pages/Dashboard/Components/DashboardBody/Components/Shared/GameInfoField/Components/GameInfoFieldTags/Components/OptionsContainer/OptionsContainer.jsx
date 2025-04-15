import { useEffect, useRef, useState } from 'react';

import ErrorMessage from '../../../../../../../../../../../Shared/ErrorMessage/ErrorMessage/ErrorMessage';
import FilterOption from '../../../../../../../../../../../Shared/FilterOption/FilterOption';

import styles from './OptionsContainer.module.css';

export default function OptionsContainer({
	title,
	tags,
	gameTags,
	initialState = {},
	errorChange,
	errorMessage,
}) {
	const [optionSates, setOptionSates] = useState(initialState);
	const [errorShow, setErrorShow] = useState(false);
	const errorShowRef = useRef(errorShow);
	errorShowRef.current = errorShow;

	const optionStatesRef = useRef(optionSates);
	optionStatesRef.current = optionSates;

	useEffect(() => {
		if (errorChange && errorMessage) {
			setErrorShow(true);
		}
	}, [errorChange, errorMessage]);

	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			setState: (props, name) => {
				setOptionSates(props);
				setTimeout(() => {
					if (optionStatesRef.current[name]) {
						gameTags.current.gameTags[title][name] = true;
					} else {
						delete gameTags.current.gameTags[title][name];
					}
				}, 0);
				if (errorShowRef.current) {
					setErrorShow(false);
				}
			},
		};
	}
	return (
		<div className={styles.optionsContainer}>
			<h4>{title}</h4>
			<ul>
				{tags.map((tag, i) => (
					<FilterOption
						border={tags.length - 1 !== i}
						key={tag}
						name={tag}
						setState={eventRef.current.setState}
						state={optionSates[tag]}
						text={tag}
					/>
				))}
			</ul>
			<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
		</div>
	);
}
