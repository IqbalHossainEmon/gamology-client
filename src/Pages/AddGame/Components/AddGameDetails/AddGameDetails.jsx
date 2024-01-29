import FileUploadButton from '../../../../Shared/FileUploadButton/FileUploadButton';
import TextField from '../../../../Shared/TextField/TextField';
import styles from './AddGameDetails.module.css';

export default function AddGameDetails({ gameData }) {
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
        autoComplete
      />

      <div className={styles.flexContainer}>
        <TextField
          setState={handleSetValue}
          field="input"
          name="developer"
          placeholder="Developer"
        />
        <TextField
          setState={handleSetValue}
          className={styles.marginRight}
          name="publisher"
          field="input"
          placeholder="Publisher"
        />
      </div>
      <div className={styles.flexContainer}>
        <FileUploadButton
          setState={handleSetValue}
          name="logo"
          accept="image/*"
          placeholder="Choose cover image"
        />
        <FileUploadButton
          className={styles.marginRight}
          setState={handleSetValue}
          accept="image/*"
          name="phoneLogo"
          placeholder="Choose portrait cover image"
          // errorMessage={"This image's ratio is not 9:16"}
        />
      </div>
    </section>
  );
}
