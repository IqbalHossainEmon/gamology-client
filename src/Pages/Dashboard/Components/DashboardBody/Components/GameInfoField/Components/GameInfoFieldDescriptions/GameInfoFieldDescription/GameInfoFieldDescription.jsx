import { useRef } from 'react';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import styles from './GameInfoFieldDescription.module.css';

export default function GameInfoFieldDescription({ item, index, gameDescriptions, errorChange, errorMessages }) {
    const valueRef = useRef({});

    const handleSetValues = (value, name) => {
        valueRef.current[name] = value;
    };

    const handleSetDescription = () => {
        gameDescriptions.descriptions[index] = valueRef.current;
    };

    return (
        <div className={styles.description} onBlur={handleSetDescription}>
            {item.main && (
                <div className={styles.mainHeader}>
                    <TextField
                        field="input"
                        setState={handleSetValues}
                        placeholder="Main Header"
                        name="mainHeader"
                        htmlFor={`main_header_${index}${item.id}`}
                        errorChange={errorChange}
                        errorMessage={errorMessages[index]?.mainHeader}
                    />
                </div>
            )}
            <div className={item.onlySubHeader ? [styles.subHeader, styles.onlySubHeader].join(' ') : styles.subHeader}>
                <TextField
                    field="input"
                    setState={handleSetValues}
                    name="subHeader"
                    placeholder="Sub Header"
                    htmlFor={`sub_header_${index}${item.id}`}
                    errorChange={errorChange}
                    errorMessage={errorMessages[index]?.subHeader}
                />
            </div>
            {item.onlySubHeader || (
                <div className={styles.subHeader}>
                    <TextField
                        field="textarea"
                        setState={handleSetValues}
                        name="description"
                        placeholder="Sub Header"
                        htmlFor={`description_${index}${item.id}`}
                        errorChange={errorChange}
                        errorMessage={errorMessages[index]?.description}
                    />
                </div>
            )}
        </div>
    );
}
