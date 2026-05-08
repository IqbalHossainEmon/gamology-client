import { areObjectsEqual } from "../../../../../../../../../../Utils/Lib/objectUtilities";

import styles from "./ApplyButton.module.css";

export default function ApplyButton({ filterState, state, dispatch, setShow }) {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.applyButton} ${
          areObjectsEqual(filterState, state)
            ? styles.disableButton
            : styles.activeButton
        }`}
        onClick={() => {
          setShow(false);
          dispatch({ type: "filterChange", filter: state });
        }}
        type="button"
      >
        Apply Change
      </button>
    </div>
  );
}
