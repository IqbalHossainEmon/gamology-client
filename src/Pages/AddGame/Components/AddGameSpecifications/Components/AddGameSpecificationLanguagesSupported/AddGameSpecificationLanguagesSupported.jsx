import { useRef, useState } from 'react';
import FilterOption from '../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import TextField from '../../../../../../Shared/TextField/TextField';
import styles from './AddGameSpecificationLanguagesSupported.module.css';

const AddGameSpecificationLanguagesSupported = ({ handleValue }) => {
  const [separate, setSeparate] = useState({ separate: false });

  const language = useRef({ text: '' });

  const handleLanguagesSupported = () => {
    handleValue(
      {
        key: 'Language Supported',
        value: separate.separate
          ? [language.current.text, language.current.audio]
          : language.current.text,
      },
      'others'
    );
  };

  return (
    <div
      className={styles.addGameSpecificationLanguagesSupported}
      onBlur={handleLanguagesSupported}
    >
      <div className={styles.textField}>
        <TextField
          setState={(value, name) => {
            language.current[name] = value;
          }}
          rows="3"
          field="textarea"
          name="text"
          htmlFor="lang_support"
          placeholder={separate.separate ? 'Text Languages Supported' : 'Languages Supported'}
        />
      </div>
      {separate.separate && (
        <div className={styles.textField}>
          <TextField
            setState={(value, name) => {
              language.current[name] = value;
            }}
            rows="3"
            field="textarea"
            name="audio"
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
