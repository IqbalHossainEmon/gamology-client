import { useEffect, useRef, useState } from 'react';
import FilterOption from '../../../../../../../../../../Shared/FilterOption/FilterOption';
import TextField from '../../../../../../../../../../Shared/TextField/TextField';
import styles from './GameInfoFieldSpecsLangsSupported.module.css';

const GameInfoFieldSpecsLangsSupported = ({
    handleValue,
    errorMessages,
    errorChange,
    defaultValue,
    hasDefault,
    gameSpecifications,
}) => {
    const [separate, setSeparate] = useState({ separate: hasDefault });

    const language = useRef({
        text: hasDefault ? (Array.isArray(defaultValue.value) ? defaultValue.value[0] : defaultValue.value) : '',
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
                    setState={(value, name) => {
                        language.current[name] = value;
                    }}
                    rows="3"
                    field="textarea"
                    name="text"
                    htmlFor="lang_support_text"
                    placeholder={separate.separate ? 'Text Languages Supported' : 'Languages Supported'}
                    errorMessage={errorMessages[0]}
                    errorChange={errorChange}
                    {...(hasDefault && {
                        defaultValue: Array.isArray(defaultValue.value) ? defaultValue.value[0] : defaultValue.value,
                    })}
                />
            </div>
            {separate.separate && (
                <div className={styles.textField}>
                    <TextField
                        setState={(value, name) => {
                            language.current[name] = value;
                        }}
                        rows="3"
                        field="textarea"
                        name="audio"
                        htmlFor="lang_support_audio"
                        placeholder="Audio Languages Supported"
                        errorMessage={errorMessages[1]}
                        errorChange={errorChange}
                        {...(hasDefault &&
                            Array.isArray(defaultValue.value) && { defaultValue: defaultValue.value[1] })}
                    />
                </div>
            )}
            <div className={styles.switch}>
                <FilterOption
                    text="Show Audio"
                    setState={obj => {
                        setSeparate(obj);
                    }}
                    name="separate"
                    state={separate.separate}
                />
            </div>
        </div>
    );
};
export default GameInfoFieldSpecsLangsSupported;
