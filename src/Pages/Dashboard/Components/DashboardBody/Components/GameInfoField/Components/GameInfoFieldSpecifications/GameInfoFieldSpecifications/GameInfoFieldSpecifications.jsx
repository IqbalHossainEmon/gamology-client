import TextField from '../../../../../../../../../Shared/TextField/TextField';
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
        gameSpecifications[name] = value;
    };

    return (
        <div className={styles.addGameSpecifications}>
            <h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&#39;s System Requirement</h3>
            <GameInfoFieldSpecificationContainer
                gameSpecifications={gameSpecifications}
                errorMessages={errorMessages.spec}
                errorChange={errorChange}
                {...(hasDefault && { defaultGameSpecifications: defaultGameSpecifications.spec })}
                hasDefault={hasDefault}
            />
            <div>
                <GameInfoFieldSpecsLangsSupported
                    handleValue={handleValue}
                    errorMessages={errorMessages.others}
                    errorChange={errorChange}
                    gameSpecifications={gameSpecifications}
                    {...(hasDefault && { defaultValue: defaultGameSpecifications.others })}
                    hasDefault={hasDefault}
                />
                <div className={styles.textField}>
                    <TextField
                        setState={handleValue}
                        name="copyWrite"
                        field="input"
                        htmlFor="copyright"
                        placeholder="Copyright"
                        errorChange={errorChange}
                        errorMessage={errorMessages.copyWrite}
                        {...(hasDefault && { defaultValue: defaultGameSpecifications.copyWrite })}
                    />
                </div>
                <div className={styles.textField}>
                    <TextField
                        setState={handleValue}
                        name="policy"
                        field="input"
                        htmlFor="privacy"
                        placeholder="Privacy Policy Link"
                        errorChange={errorChange}
                        errorMessage={errorMessages.policy}
                        {...(hasDefault && { defaultValue: defaultGameSpecifications.policy })}
                    />
                </div>
            </div>
        </div>
    );
}
