import FilterOption from '../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import styles from './OptionsContainer.module.css';

export default function OptionsContainer({ title, options, setState, state }) {
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
            state={state}
            name={option.name}
          />
        ))}
      </ul>
    </div>
  );
}
