import SortContainer from '../Components/SortContainer/SortContainer/SortContainer';
import styles from './BrowseHeader.module.css';

export default function BrowseHeader({ handleChange, state }) {
    return (
        <div className={styles.browseHeader}>
            <h2 className={styles.numberOfGames}>{state.numberOfGames} Games</h2>
            <SortContainer state={state} handleChange={handleChange} />
        </div>
    );
}
