import FileUploadButton from '../../../../Shared/FileUploadButton/FileUploadButton';
import TextField from '../../../../Shared/TextField/TextField';
import styles from './AddGameDetails.module.css';

export default function AddGameDetails({ gameData, errorChange, errorMessages }) {
  const handleSetValue = (value, name) => {
    gameData.current.gameInfo[name] = value;
  };

  return (
    <section className={styles.gameDetails}>
      <h3 className={styles.header}>Add Game&apos;s Details</h3>
      <TextField
        setState={handleSetValue}
        field="input"
        name="name"
        placeholder="Game's Name"
        errorChange={errorChange}
        errorMessage={errorMessages.current.gameInfo.name}
      />

      <div className={styles.flexContainer}>
        <TextField
          setState={handleSetValue}
          field="input"
          name="developer"
          placeholder="Developer"
          errorChange={errorChange}
          errorMessage={errorMessages.current.gameInfo.name}
        />
        <TextField
          setState={handleSetValue}
          className={styles.marginRight}
          name="publisher"
          field="input"
          placeholder="Publisher"
          errorChange={errorChange}
          errorMessage={errorMessages.current.gameInfo.name}
        />
      </div>
      <div className={styles.flexContainer}>
        <FileUploadButton
          setState={handleSetValue}
          name="logo"
          accept="image/*"
          placeholder="Choose cover image"
          errorChange={errorChange}
          errorMessage={errorMessages.current.gameInfo.logo}
        />
        <FileUploadButton
          className={styles.marginRight}
          setState={handleSetValue}
          accept="image/*"
          name="phoneLogo"
          placeholder="Choose portrait cover image"
          errorChange={errorChange}
          errorMessage={errorMessages.current.gameInfo.phoneLogo}
        />
      </div>
    </section>
  );
}
