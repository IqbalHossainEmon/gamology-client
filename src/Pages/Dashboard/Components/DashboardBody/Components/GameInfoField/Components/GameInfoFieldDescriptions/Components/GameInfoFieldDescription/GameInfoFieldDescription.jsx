import { useRef } from 'react';
import TextField from '../../../../../../../../../../Shared/TextField/TextField';
import styles from './GameInfoFieldDescription.module.css';

export default function GameInfoFieldDescription({ item, index, gameDescriptions, errorChange, errorMessages, defaultData }) {
    const valueRef = useRef({});

    const handleSetValues = (value, name) => {
        valueRef.current[name] = value;
    };

    const handleSetDescription = () => {
        gameDescriptions.current.gameDescriptions.descriptions[index] = valueRef.current;
    };

    return (
        <div className={styles.description} onBlur={handleSetDescription}>
            {item.mainHeader && (
                <div className={styles.mainHeader}>
                    <TextField
                        field="input"
                        setState={handleSetValues}
                        placeholder="Main Header"
                        name="mainHeader"
                        htmlFor={`main_header_${index}${item.id}`}
                        errorChange={errorChange}
                        errorMessage={errorMessages.current.gameDescriptionsError.descriptions[index]?.mainHeader}
                        {...(defaultData && { defaultValue: defaultData.shortDesc })}
                    />
                </div>
            )}
            {item.subHeader && (
                <div className={styles.subHeader}>
                    <TextField
                        field="input"
                        setState={handleSetValues}
                        name="subHeader"
                        placeholder="Sub Header"
                        htmlFor={`sub_header_${index}${item.id}`}
                        errorChange={errorChange}
                        errorMessage={errorMessages.current.gameDescriptionsError.descriptions[index]?.subHeader}
                        {...(defaultData && { defaultValue: defaultData.subHeader })}
                    />
                </div>
            )}
            {item.description && (
                <div className={styles.subHeader}>
                    <TextField
                        field="textarea"
                        setState={handleSetValues}
                        name="description"
                        placeholder="Description"
                        htmlFor={`description_${index}${item.id}`}
                        errorChange={errorChange}
                        errorMessage={errorMessages.current.gameDescriptionsError.descriptions[index]?.description}
                        {...(defaultData && { defaultValue: defaultData.description })}
                    />
                </div>
            )}
        </div>
    );
}
