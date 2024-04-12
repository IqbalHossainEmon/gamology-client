import styles from './TagsContainer.module.css';

const TagsContainer = ({ tag, setModal }) => {
    /* 
        title: null,
        modalQuestion: null,
        modalBody: null,
        show: false,
    */

    const handleCategoryDelete = () => {
        setModal({
            title: 'Delete Category',
            modalQuestion: 'Are you sure you want to delete this category?',
            modalBody: 'All tags under this category will be deleted.',
            show: true,
        });
    };

    const handleTagDelete = () => {
        console.log('Tag Deleted');
    };

    return (
        <div className={styles.tag}>
            <div className={styles.tagHeader}>
                <h3>{tag.category}</h3>
                <button type="button" className={styles.crossBtn} onClick={handleCategoryDelete}>
                    <span className={styles.cross} />
                </button>
            </div>
            <ul className={styles.tagList}>
                {tag.optionList.map(option => (
                    <li key={option.id} className={styles.tagListItem}>
                        <p className={styles.tagItem}>{option.tags}</p>
                        <button type="button" className={styles.crossBtn} onClick={handleTagDelete}>
                            <span className={styles.cross} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default TagsContainer;
