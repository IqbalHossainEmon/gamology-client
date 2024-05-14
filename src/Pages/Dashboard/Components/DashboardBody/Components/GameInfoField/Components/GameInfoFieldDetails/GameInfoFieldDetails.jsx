import FileUploadButton from '../../../../../../../../Shared/FileUploadButton/FileUploadButton';
import TextField from '../../../../../../../../Shared/TextField/TextField';
import styles from './GameInfoFieldDetails.module.css';

export default function GameInfoFieldDetails({ gameInfo, errorChange, errorMessages, hasDefault, defaultGameInfo }) {
    const handleSetValue = (value, name) => {
        if (value.type === 'FormData' && !value.file) {
            delete gameInfo.current.gameInfo[name];
        } else {
            gameInfo.current.gameInfo[name] = value;
        }
    };

    return (
        <section className={styles.gameDetails}>
            <h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&apos;s Details</h3>
            <TextField
                setState={handleSetValue}
                field="input"
                name="name"
                placeholder="Game's Name"
                errorChange={errorChange}
                errorMessage={errorMessages.current.gameInfoError.name}
                {...(hasDefault && { defaultValue: defaultGameInfo.name })}
                htmlFor="gameName"
            />

            <div className={styles.flexContainer}>
                <TextField
                    setState={handleSetValue}
                    field="input"
                    name="developer"
                    placeholder="Developer"
                    htmlFor="developer"
                    errorChange={errorChange}
                    errorMessage={errorMessages.current.gameInfoError.developer}
                    {...(hasDefault && { defaultValue: defaultGameInfo.developer })}
                />
                <TextField
                    setState={handleSetValue}
                    className={styles.marginRight}
                    name="publisher"
                    field="input"
                    placeholder="Publisher"
                    htmlFor="publisher"
                    errorChange={errorChange}
                    errorMessage={errorMessages.current.gameInfoError.publisher}
                    {...(hasDefault && { defaultValue: defaultGameInfo.publisher })}
                />
            </div>
            <div className={styles.flexContainer}>
                <FileUploadButton
                    htmlFor="gameLogo"
                    setState={handleSetValue}
                    name="logo"
                    accept="image/*"
                    placeholder="Choose cover image"
                    errorChange={errorChange}
                    errorMessage={errorMessages.current.gameInfoError.logo}
                    {...(hasDefault && { defaultValue: defaultGameInfo.logo })}
                />
                <FileUploadButton
                    htmlFor="phoneLogo"
                    className={styles.marginRight}
                    setState={handleSetValue}
                    accept="image/*"
                    name="phoneLogo"
                    placeholder="Choose portrait cover image"
                    errorChange={errorChange}
                    errorMessage={errorMessages.current.gameInfoError.phoneLogo}
                    {...(hasDefault && { defaultValue: defaultGameInfo.phoneLogo })}
                />
            </div>
        </section>
    );
}
