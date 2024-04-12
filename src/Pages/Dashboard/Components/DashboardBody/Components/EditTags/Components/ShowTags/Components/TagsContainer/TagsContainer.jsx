import styles from './TagsContainer.module.css';

const TagsContainer = ({ tag }) => (
    <div className={styles.tag}>
        <div className={styles.tagHeader}>
            <h3>{tag.category}</h3>
            <button type="button" className={styles.crossBtn}>
                <span className={styles.cross} />
            </button>
        </div>
        <ul className={styles.tagList}>
            {tag.optionList.map(option => (
                <li key={option.id} className={styles.tagListItem}>
                    <p className={styles.tagItem}>{option.tags}</p>
                    <button type="button" className={styles.crossBtn}>
                        <span className={styles.cross} />
                    </button>
                </li>
            ))}
        </ul>
    </div>
);
export default TagsContainer;
