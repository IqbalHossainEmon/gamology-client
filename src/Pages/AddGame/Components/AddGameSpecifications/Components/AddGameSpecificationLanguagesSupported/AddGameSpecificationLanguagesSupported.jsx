import { useRef, useState } from 'react';
import FilterOption from '../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import TextField from '../../../../../../Shared/TextField/TextField';
import styles from './AddGameSpecificationLanguagesSupported.module.css';

const AddGameSpecificationLanguagesSupported = ({ handleValue }) => {
  const [separate, setSeparate] = useState({ separate: false });

  const LanguageRef = useRef('');
  const LanguageAudioRef = useRef('');

  const handleLanguagesSupported = () => {
    switch (separate.separate) {
      case false:
        handleValue({ key: 'Language Supported', value: LanguageRef.current }, 'others');
        break;
      default:
        handleValue(
          {
            key: 'Language Supported',
            value: [`AUDIO: ${LanguageAudioRef.current}`, `TEXT: ${LanguageRef.current}`],
          },
          'others'
        );
        break;
    }
  };

  return (
    <div
      className={styles.addGameSpecificationLanguagesSupported}
      onBlur={handleLanguagesSupported}
    >
      <div className={styles.textField}>
        <TextField
          setState={value => {
            LanguageRef.current = value;
          }}
          rows="3"
          field="textarea"
          name="text"
          htmlFor="lang_support"
          placeholder={separate.separate ? 'TEXT: (Languages Supported)' : 'Languages Supported'}
        />
      </div>
      {separate.separate && (
        <div className={styles.textField}>
          <TextField
            setState={value => {
              LanguageAudioRef.current = value;
            }}
            rows="3"
            field="textarea"
            name="audio"
            htmlFor="lang_support"
            placeholder="AUDIO: (Languages Supported)"
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
