import { useEffect, useRef, useState } from 'react';
import FilterOption from '../../../../../../../../../../../Shared/FilterOption/FilterOption';
import TextField from '../../../../../../../../../../../Shared/TextField/TextField/TextField';
import styles from './GameInfoFieldSpecsLangsSupported.module.css';

function GameInfoFieldSpecsLangsSupported({
	handleValue,
	errorMessages,
	errorChange,
	defaultValue,
	hasDefault,
	gameSpecifications,
}) {
	const [separate, setSeparate] = useState({ separate: hasDefault });
	const language = useRef({
		text: hasDefault
			? Array.isArray(defaultValue.value)
				? defaultValue.value[0]
				: defaultValue.value
			: '',
		audio: hasDefault && Array.isArray(defaultValue.value) ? defaultValue.value[1] : '',
	});

	useEffect(() => {
		if (separate.separate) {
			gameSpecifications.current.gameSpecifications.others.value = [
				language.current.text,
				language.current.audio,
			];
		} else {
			gameSpecifications.current.gameSpecifications.others.value = language.current.text;
		}
	}, [gameSpecifications, separate]);

	return (
		<div
			className={styles.addGameSpecificationLanguagesSupported}
			onBlur={() =>
				handleValue(
					{
						key: 'Language Supported',
						value: separate.separate
							? [language.current.text, language.current.audio]
							: language.current.text,
					},
					'others'
				)
			}
		>
			<div className={styles.textField}>
				<TextField
					errorChange={errorChange}
					errorMessage={errorMessages[0]}
					field='textarea'
					htmlFor='lang_support_text'
					propertyName='text'
					placeholder={
						separate.separate ? 'Text Languages Supported' : 'Languages Supported'
					}
					rows='3'
					setState={(value, name) => {
						language.current[name] = value;
					}}
					{...(hasDefault && {
						defaultValue: Array.isArray(defaultValue.value)
							? defaultValue.value[0]
							: defaultValue.value,
					})}
				/>
			</div>

			{separate.separate ? (
				<div className={styles.textField}>
					<TextField
						errorChange={errorChange}
						errorMessage={errorMessages[1]}
						field='textarea'
						htmlFor='lang_support_audio'
						propertyName='audio'
						placeholder='Audio Languages Supported'
						rows='3'
						setState={(value, name) => {
							language.current[name] = value;
						}}
						{...(hasDefault &&
							Array.isArray(defaultValue.value) && {
								defaultValue: defaultValue.value[1],
							})}
					/>
				</div>
			) : null}

			<div className={styles.switch}>
				<FilterOption
					name='separate'
					setState={obj => {
						setSeparate(obj);
					}}
					state={separate.separate}
					text='Show Audio'
				/>
			</div>
		</div>
	);
}
export default GameInfoFieldSpecsLangsSupported;
