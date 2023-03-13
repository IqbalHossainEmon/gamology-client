import styles from './ApplyButton.module.css';

export default function ApplyButton({ filterState, state, dispatch, setShow }) {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={
          JSON.stringify(filterState) !== JSON.stringify(state)
            ? `${styles.activeButton} ${styles.applyButton}`
            : `${styles.disableButton} ${styles.applyButton}`
        }
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
