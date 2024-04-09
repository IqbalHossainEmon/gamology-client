import styles from './SingleTag.module.css';

const SingleTag = ({ tags }) => (
    <li className={styles.tagListItem}>
        <p className={styles.tagItem}>{tags}</p>
        <button type="button" className={styles.crossBtn}>
            <span className={styles.cross} />
        </button>
    </li>
);
export default SingleTag;
