import { useCallback, useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import FilterOption from '../../../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import styles from './OptionsContainer.module.css';

export default function OptionsContainer({ title, options, gameTags, initialState = {}, errorChange, errorMessage }) {
  const [optionSates, setOptionSates] = useState(initialState);
  const [errorShow, setErrorShow] = useState(false);

  const errorShowRef = useRef(errorShow);
  errorShowRef.current = errorShow;

  const optionStatesRef = useRef(optionSates);
  optionStatesRef.current = optionSates;

  const setValue = useCallback(
    name => {
      setTimeout(() => {
        if (optionStatesRef.current[name]) {
          gameTags[title.toLowerCase()][name] = true;
        } else {
          delete gameTags[title.toLowerCase()][name];
        }
      }, 0);
    },
    [gameTags, title]
  );

  useEffect(() => {
    if (errorChange && errorMessage) setErrorShow(true);
  }, [errorChange, errorMessage]);

  const setState = useCallback(
    (props, name) => {
      setOptionSates(props);
      setValue(name);
      if (errorShowRef.current) {
        setErrorShow(false);
      }
    },
    [setValue]
  );

  return (
    <div className={styles.optionsContainer}>
      <h4>{title}</h4>
      <ul>
        {options.map((option, i) => (
          <FilterOption
            key={option.id}
            text={option.text}
            setState={setState}
            border={options.length - 1 !== i}
            state={optionSates[option.filter]}
            name={option.filter}
          />
        ))}
      </ul>
      <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
    </div>
  );
}
