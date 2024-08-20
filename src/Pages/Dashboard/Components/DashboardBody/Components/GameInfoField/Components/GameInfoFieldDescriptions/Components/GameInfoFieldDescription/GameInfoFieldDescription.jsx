import { useRef } from 'react';
import TextField from '../../../../../../../../../../Shared/TextField/TextField';
import styles from './GameInfoFieldDescription.module.css';

export default function GameInfoFieldDescription({ item, index, gameDescriptions, errorChange, errorMessages, defaultData }) {
    const valueRef = useRef({}),

     handleSetValues = (value, name) => {
        valueRef.current[name] = value;
    },

     handleSetDescription = () => {
        gameDescriptions.current.gameDescriptions.descriptions[index] = valueRef.current;
    };

    return (
        <div
            className={styles.description}
            onBlur={handleSetDescription}
        >
            {item.mainHeader ? <div className={styles.mainHeader}>
                <TextField
                    errorChange={errorChange}
                    errorMessage={errorMessages.current.gameDescriptionsError.descriptions[index]?.mainHeader}
                    field="input"
                    htmlFor={`main_header_${index}${item.id}`}
                    name="mainHeader"
                    placeholder="Main Header"
                    setState={handleSetValues}
                    {...(defaultData && { defaultValue: defaultData.shortDesc })}
                />
                               </div> : null}

            {item.subHeader ? <div className={styles.subHeader}>
                <TextField
                    errorChange={errorChange}
                    errorMessage={errorMessages.current.gameDescriptionsError.descriptions[index]?.subHeader}
                    field="input"
                    htmlFor={`sub_header_${index}${item.id}`}
                    name="subHeader"
                    placeholder="Sub Header"
                    setState={handleSetValues}
                    {...(defaultData && { defaultValue: defaultData.subHeader })}
                />
                              </div> : null}

            {item.description ? <div className={styles.subHeader}>
                <TextField
                    errorChange={errorChange}
                    errorMessage={errorMessages.current.gameDescriptionsError.descriptions[index]?.description}
                    field="textarea"
                    htmlFor={`description_${index}${item.id}`}
                    name="description"
                    placeholder="Description"
                    setState={handleSetValues}
                    {...(defaultData && { defaultValue: defaultData.description })}
                />
                                </div> : null}
        </div>
    );
}
