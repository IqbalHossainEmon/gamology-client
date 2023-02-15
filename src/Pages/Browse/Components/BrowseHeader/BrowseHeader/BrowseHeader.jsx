import SortButtons from '../SortButtons/SortButtons';
import styles from './BrowseHeader.module.css';

export default function BrowseHeader({ handleChange, state }) {
  return (
    <div className={styles.BrowseHeader}>
      <h2 className={styles.NumberOfGames}>{state.NumberOfGames} Games</h2>
      <SortButtons state={state} handleChange={handleChange} />
    </div>
  );
}
