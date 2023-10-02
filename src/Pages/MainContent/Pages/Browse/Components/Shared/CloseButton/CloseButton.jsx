import styles from './CloseButton.module.css';

export default function CloseButton({ setState, state }) {
  return (
    <button
      onClick={() => setState(state)}
      type="button"
      className={`${styles.container} ${styles.zoom_shrink}`}
    >
      <div className={`${styles.close_icon} ${styles.zoom_shrink}`} />
    </button>
  );
}
