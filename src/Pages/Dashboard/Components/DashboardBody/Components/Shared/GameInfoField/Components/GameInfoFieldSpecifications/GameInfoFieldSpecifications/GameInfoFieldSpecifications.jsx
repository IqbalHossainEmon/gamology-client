import TextField from '../../../../../../../../../../Shared/TextField/TextField/TextField';
import GameInfoFieldSpecificationContainer from '../Components/GameInfoFieldSpecificationContainer/GameInfoFieldSpecificationContainer';
import GameInfoFieldSpecsLangsSupported from '../Components/GameInfoFieldSpecsLangsSupported/GameInfoFieldSpecsLangsSupported';
import styles from './GameInfoFieldSpecifications.module.css';

export default function GameInfoFieldSpecifications({
	gameSpecifications,
	errorMessages,
	errorChange,
	hasDefault,
	defaultGameSpecifications,
}) {
	const handleValue = (value, name) => {
		gameSpecifications.current.gameSpecifications[name] = value;
	};

	return (
		<div className={styles.addGameSpecifications}>
			<h3 className={styles.header}>
				{hasDefault ? 'Edit' : 'Add'} Game&#39;s System Requirement
			</h3>
			<GameInfoFieldSpecificationContainer
				errorChange={errorChange}
				errorMessages={errorMessages.current.gameSpecificationsError.spec}
				gameSpecifications={gameSpecifications}
				{...(hasDefault && { defaultGameSpecifications: defaultGameSpecifications.spec })}
				hasDefault={hasDefault}
			/>
			<div>
				<GameInfoFieldSpecsLangsSupported
					errorChange={errorChange}
					errorMessages={errorMessages.current.gameSpecificationsError.others}
					gameSpecifications={gameSpecifications}
					handleValue={handleValue}
					{...(hasDefault && { defaultValue: defaultGameSpecifications.others })}
					hasDefault={hasDefault}
				/>
				<div className={styles.textField}>
					<TextField
						errorChange={errorChange}
						errorMessage={errorMessages.current.gameSpecificationsError.copyWrite}
						field='input'
						htmlFor='copyright'
						propertyName='copyWrite'
						placeholder='Copyright'
						setState={handleValue}
						{...(hasDefault && { defaultValue: defaultGameSpecifications.copyWrite })}
					/>
				</div>
				<div className={styles.textField}>
					<TextField
						errorChange={errorChange}
						errorMessage={errorMessages.current.gameSpecificationsError.policy}
						field='input'
						htmlFor='privacy'
						propertyName='policy'
						placeholder='Privacy Policy Link'
						setState={handleValue}
						{...(hasDefault && { defaultValue: defaultGameSpecifications.policy })}
					/>
				</div>
			</div>
		</div>
	);
}
