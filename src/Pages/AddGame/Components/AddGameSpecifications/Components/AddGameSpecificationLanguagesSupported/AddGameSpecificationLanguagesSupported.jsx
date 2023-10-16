import { useState } from 'react';
import FilterOption from '../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import TextField from '../../../../../../Shared/TextField/TextField';
import styles from './AddGameSpecificationLanguagesSupported.module.css';

const AddGameSpecificationLanguagesSupported = () => {
  const [separate, setSeparate] = useState({ separate: false });

  return (
    <div className={styles.addGameSpecificationLanguagesSupported}>
      <div className={styles.textField}>
        <TextField
          rows="3"
          field="textarea"
          name="text others"
          htmlFor="lang_support"
          placeholder={separate.separate ? 'Text Languages Supported' : 'Languages Supported'}
        />
      </div>
      {separate.separate && (
        <div className={styles.textField}>
          <TextField
            rows="3"
            field="textarea"
            name="audio others"
            htmlFor="lang_support"
            placeholder="Audio Languages Supported"
          />
        </div>
      )}
      <div className={styles.switch}>
        <FilterOption
          text="Show Audio"
          setState={setSeparate}
          name="separate"
          state={separate.separate}
        />
      </div>
    </div>
  );
};
export default AddGameSpecificationLanguagesSupported;
