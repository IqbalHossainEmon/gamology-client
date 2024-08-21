import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import FilterOption from '../../../../../../../../../../Shared/FilterOption/FilterOption';
import styles from './OptionsContainer.module.css';

export default function OptionsContainer({
	title,
	options,
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
				{options.map((option, i) => (
					<FilterOption
						border={options.length - 1 !== i}
						key={option.id}
						name={option.filter}
						setState={eventRef.current.setState}
						state={optionSates[option.filter]}
						text={option.text}
					/>
				))}
			</ul>

			<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
		</div>
	);
}
