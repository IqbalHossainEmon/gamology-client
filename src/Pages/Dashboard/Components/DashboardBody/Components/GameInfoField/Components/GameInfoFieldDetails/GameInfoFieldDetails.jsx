import FileUploadButton from '../../../../../../../../Shared/FileUploadButton/FileUploadButton';
import TextField from '../../../../../../../../Shared/TextField/TextField';
import styles from './GameInfoFieldDetails.module.css';

export default function GameInfoFieldDetails({ gameInfo, errorChange, errorMessages, hasDefault, defaultGameInfo }) {
    const handleSetValue = (value, name) => {
        if (value.type === 'FormData' && !value.file) {
            delete gameInfo[name];
        } else {
            gameInfo[name] = value;
        }
    };

    console.log(defaultGameInfo);
    return (
        <section className={styles.gameDetails}>
            <h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&apos;s Details</h3>
            <TextField
                setState={handleSetValue}
                field="input"
                name="name"
                placeholder="Game's Name"
                errorChange={errorChange}
                errorMessage={errorMessages.name}
                {...(hasDefault && { defaultValue: defaultGameInfo.name })}
            />

            <div className={styles.flexContainer}>
                <TextField
                    setState={handleSetValue}
                    field="input"
                    name="developer"
                    placeholder="Developer"
                    errorChange={errorChange}
                    errorMessage={errorMessages.developer}
                    {...(hasDefault && { defaultValue: defaultGameInfo.developer })}
                />
                <TextField
                    setState={handleSetValue}
                    className={styles.marginRight}
                    name="publisher"
                    field="input"
                    placeholder="Publisher"
                    errorChange={errorChange}
                    errorMessage={errorMessages.publisher}
                    {...(hasDefault && { defaultValue: defaultGameInfo.publisher })}
                />
            </div>
            <div className={styles.flexContainer}>
                <FileUploadButton
                    htmlFor={1}
                    setState={handleSetValue}
                    name="logo"
                    accept="image/*"
                    placeholder="Choose cover image"
                    errorChange={errorChange}
                    errorMessage={errorMessages.logo}
                    {...(hasDefault && { defaultValue: defaultGameInfo.logo })}
                />
                <FileUploadButton
                    htmlFor={2}
                    className={styles.marginRight}
                    setState={handleSetValue}
                    accept="image/*"
                    name="phoneLogo"
                    placeholder="Choose portrait cover image"
                    errorChange={errorChange}
                    errorMessage={errorMessages.phoneLogo}
                    {...(hasDefault && { defaultValue: defaultGameInfo.phoneLogo })}
                />
            </div>
        </section>
    );
}
