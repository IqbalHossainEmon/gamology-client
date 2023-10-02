import RotateArrow from '../../../../../../Shared/RotateArrow/RotateArrow';
import styles from './SortButton.module.css';

export default function SortButton({ setShow, show, state }) {
  return (
    <button
      onClick={() => setShow('sort')}
      className={styles.button}
      type="button"
    >
      Show : <span className={styles.sortBy}>{state.sortBy}</span>
      <div className={styles.downArrow}>
        <RotateArrow state={show} />
      </div>
    </button>
  );
}
