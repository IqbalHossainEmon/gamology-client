import styles from './ApplyButton.module.css';

export default function ApplyButton({ filterState, state, dispatch, setShow }) {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.applyButton} ${
          JSON.stringify(filterState) !== JSON.stringify(state)
            ? styles.activeButton
            : styles.disableButton
        }`}
        type="button"
        onClick={() => {
          setShow('filter');
          dispatch({ type: 'filterChange', filter: state });
        }}
      >
        Apply Change
      </button>
    </div>
  );
}
