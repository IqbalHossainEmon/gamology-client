import { useCallback, useRef, useState } from 'react';
import FilterOption from '../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import styles from './OptionsContainer.module.css';

export default function OptionsContainer({ title, options, gameData, initialState = {} }) {
  const [optionSates, setOptionSates] = useState(initialState);

  const optionStatesRef = useRef(optionSates);
  optionStatesRef.current = optionSates;

  const setValue = useCallback(
    name => {
      setTimeout(() => {
        if (optionStatesRef.current[name]) {
          gameData.current.gameTags[title.toLowerCase()][name] = true;
        } else {
          delete gameData.current.gameTags[title.toLowerCase()][name];
        }
      }, 0);
    },
    [gameData, title]
  );

  const setState = useCallback(
    (props, name) => {
      setOptionSates(props);
      setValue(name);
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
    </div>
  );
}
