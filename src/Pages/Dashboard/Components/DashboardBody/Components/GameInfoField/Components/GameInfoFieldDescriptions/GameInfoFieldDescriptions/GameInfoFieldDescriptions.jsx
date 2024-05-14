import { useState } from 'react';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import ButtonForGameInfoFieldSection from '../../ButtonForGameInfoFieldSection/ButtonForGameInfoFieldSection';
import GameInfoFieldDescription from '../Components/GameInfoFieldDescription/GameInfoFieldDescription';
import styles from './GameInfoFieldDescriptions.module.css';

const GameInfoFieldDescriptions = ({ gameDescriptions, errorChange, errorMessages, hasDefault, defaultGameDescriptions }) => {
    const [array, setArray] = useState(
        hasDefault
            ? defaultGameDescriptions.descriptions.map((desc, index) => {
                  const item = { id: index };
                  if (desc.mainHeader) {
                      item.main = true;
                  }
                  if (desc.description) {
                      item.description = true;
                  }
                  if (desc.subHeader) {
                      item.subHeader = true;
                  }
                  return item;
              })
            : [{ id: 0, mainHeader: true, description: true }]
    );

    const handleSetSortDescription = (value, name) => {
        gameDescriptions.current.gameDescriptions[name] = value;
    };

    return (
        <section className={styles.addGameDescriptions}>
            <h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&#39;s Descriptions</h3>
            <div className={styles.sortDescription}>
                <TextField
                    field="textarea"
                    setState={handleSetSortDescription}
                    placeholder="Short description..."
                    htmlFor="short_description"
                    name="shortDesc"
                    errorChange={errorChange}
                    errorMessage={errorMessages.current.gameDescriptionsError.sortDesc}
                    {...(hasDefault && { defaultValue: defaultGameDescriptions.shortDesc })}
                />
            </div>
            <div>
                {array.map((item, index) => (
                    <GameInfoFieldDescription
                        key={`${item.id}`}
                        item={item}
                        index={index}
                        gameDescriptions={gameDescriptions}
                        errorChange={errorChange}
                        errorMessages={errorMessages}
                        {...(hasDefault && { defaultData: defaultGameDescriptions.descriptions[index] })}
                    />
                ))}
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.btn}>
                    <ButtonForGameInfoFieldSection
                        onClick={() => {
                            setArray(prev => [...prev, { id: prev.length, subHeader: true, description: true }]);
                            gameDescriptions.current.gameDescriptions.descriptions.push({ subHeader: '', description: '' });
                        }}
                        text="Add more +"
                    />
                </div>
                <div className={styles.btn}>
                    <ButtonForGameInfoFieldSection
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
                    <ButtonForGameInfoFieldSection
                        {...(array[array.length - 1].main === true && {
                            disabled: true,
                        })}
                        onClick={() => {
                            setArray(prev => {
                                const prevState = [...prev];
                                prevState[prevState.length - 1].mainHeader = true;
                                return prevState;
                            });
                            gameDescriptions.current.gameDescriptions.descriptions[
                                gameDescriptions.current.gameDescriptions.descriptions.length - 1
                            ].mainHeader = '';
                        }}
                        text="Add Main Header +"
                    />
                </div>
                <div className={styles.mainBtn}>
                    <ButtonForGameInfoFieldSection
                        {...((array.length === 1 || !array[array.length - 1].main) && {
                            disabled: true,
                        })}
                        onClick={() => {
                            setArray(prev => {
                                const prevState = [...prev];
                                delete prevState[prevState.length - 1].mainHeader;
                                return prevState;
                            });
                            delete gameDescriptions.current.gameDescriptions.descriptions[
                                gameDescriptions.current.gameDescriptions.descriptions.length - 1
                            ].mainHeader;
                        }}
                        text="Remove Main Header -"
                    />
                </div>
                <div className={styles.mainBtn}>
                    <ButtonForGameInfoFieldSection
                        onClick={() => {
                            setArray(prev => [...prev, { id: prev.length, subHeader: true }]);
                            gameDescriptions.current.gameDescriptions.descriptions.push({ subHeader: '' });
                        }}
                        text="Add Only Sub Header +"
                    />
                </div>
            </div>
        </section>
    );
};

export default GameInfoFieldDescriptions;
