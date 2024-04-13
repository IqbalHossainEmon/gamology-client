import { useCallback } from 'react';
import TagOrCategoryDeleteBody from '../TagOrCategoryDeleteBody/TagOrCategoryDeleteBody';
import styles from './TagsContainer.module.css';

const TagsContainer = ({ tag, setModal }) => {
    const modalBody = useCallback((props, text, handler) => <TagOrCategoryDeleteBody {...props} text={text} handler={handler} />, []);

    const categoryDeleteHandler = () => {
        console.log(tag.category, 'Category Deleted');
    };

    const handleCategoryDelete = () => {
        setModal({
            title: 'Delete Category',
            modalQuestion: (
                <>
                    Are you sure you want to delete <strong className={styles.categoryText}>{tag.category}</strong> category?
                </>
            ),
            ModalBody: props =>
                modalBody(
                    props,
                    <>
                        All tags under <strong className={styles.categoryText}>{tag.category}</strong> category will be deleted. All Games
                        that has tags under the <strong className={styles.categoryText}>{tag.category}</strong> category will be effected.
                    </>,
                    categoryDeleteHandler
                ),
            show: true,
        });
    };

    const tagDeleteHandler = data => {
        console.log(data, 'Tag Deleted');
    };

    const handleTagDelete = data => {
        setModal({
            title: 'Delete Tag',
            modalQuestion: (
                <>
                    Are you sure you want to delete <strong className={styles.categoryText}>{data}</strong> Tag?
                </>
            ),
            ModalBody: props =>
                modalBody(
                    props,
                    <>
                        All Games that has <strong className={styles.categoryText}>{data}</strong> tag will be effected.
                    </>,
                    () => tagDeleteHandler(data)
                ),
            show: true,
        });
    };

    return (
        <div className={styles.tag}>
            <div className={styles.tagHeader}>
                <h3>{tag.category}</h3>
                <button type="button" className={styles.crossBtn} onClick={() => handleCategoryDelete(tag.category)}>
                    <strong className={styles.cross} />
                </button>
            </div>
            <ul className={styles.tagList}>
                {tag.optionList.map(option => (
                    <li key={option.id} className={styles.tagListItem}>
                        <p className={styles.tagItem}>{option.tags}</p>
                        <button type="button" className={styles.crossBtn} onClick={() => handleTagDelete(option.tags)}>
                            <strong className={styles.cross} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default TagsContainer;
