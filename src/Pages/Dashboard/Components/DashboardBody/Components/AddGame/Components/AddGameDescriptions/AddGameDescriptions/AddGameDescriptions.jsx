import { useState } from 'react';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import ButtonForAddGameSection from '../../ButtonForAddGameSection/ButtonForAddGameSection';
import AddGameDescription from '../AddGameDescription/AddGameDescription';
import styles from './AddGameDescriptions.module.css';

const AddGameDescriptions = ({ gameDescriptions, errorChange, errorMessages }) => {
    const [array, setArray] = useState([{ id: 0, main: true }]);

    const handleSetSortDescription = (value, name) => {
        gameDescriptions[name] = value;
    };

    return (
        <section className={styles.addGameDescriptions}>
            <h3 className={styles.header}>Add Game&#39;s Descriptions</h3>
            <div className={styles.sortDescription}>
                <TextField
                    field="textarea"
                    setState={handleSetSortDescription}
                    placeholder="Add some short description..."
                    htmlFor="sort_description"
                    name="sortDesc"
                    errorChange={errorChange}
                    errorMessage={errorMessages.sortDesc}
                />
            </div>
            <div>
                {array.map((item, index) => (
                    <AddGameDescription
                        key={`${item.id}`}
                        item={item}
                        index={index}
                        gameDescriptions={gameDescriptions}
                        errorChange={errorChange}
                        errorMessages={errorMessages.descriptions}
                    />
                ))}
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.btn}>
                    <ButtonForAddGameSection
                        onClick={() => {
                            setArray(prev => [...prev, { id: prev.length }]);
                            gameDescriptions.descriptions.push({ subHeader: '', description: '' });
                        }}
                        text="Add more +"
                    />
                </div>
                <div className={styles.btn}>
                    <ButtonForAddGameSection
                        {...(array.length === 1 && { disabled: true })}
                        onClick={() => {
                            setArray(prev => {
                                const prevState = [...prev];
                                prevState.pop();
                                return prevState;
                            });
                        }}
                        text="Remove last one -"
                    />
                </div>
                <div className={styles.mainBtn}>
                    <ButtonForAddGameSection
                        {...(array[array.length - 1].main === true && {
                            disabled: true,
                        })}
                        onClick={() => {
                            setArray(prev => {
                                const prevState = [...prev];
                                prevState[prevState.length - 1].main = true;
                                return prevState;
                            });
                            gameDescriptions.descriptions[gameDescriptions.descriptions.length - 1].mainHeader = '';
                        }}
                        text="Add Main Header +"
                    />
                </div>
                <div className={styles.mainBtn}>
                    <ButtonForAddGameSection
                        {...((array.length === 1 || !array[array.length - 1].main) && {
                            disabled: true,
                        })}
                        onClick={() => {
                            setArray(prev => {
                                const prevState = [...prev];
                                delete prevState[prevState.length - 1].main;
                                return prevState;
                            });
                            delete gameDescriptions.descriptions[gameDescriptions.descriptions.length - 1].mainHeader;
                        }}
                        text="Remove Main Header -"
                    />
                </div>
                <div className={styles.mainBtn}>
                    <ButtonForAddGameSection
                        onClick={() => {
                            setArray(prev => [...prev, { id: prev.length, onlySubHeader: true }]);
                            gameDescriptions.descriptions.push({ subHeader: '' });
                        }}
                        text="Add Only Sub Header +"
                    />
                </div>
            </div>
        </section>
    );
};

export default AddGameDescriptions;
