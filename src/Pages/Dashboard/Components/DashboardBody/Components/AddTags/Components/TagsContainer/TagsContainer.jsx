import IndiTagsContainer from '../IndiTagsContainer/IndiTagsContainer';
import styles from './TagsContainer.module.css';

const TagsContainer = ({ tags }) => (
    <div className={styles.tagsContainer}>
        {tags.map(tag => (
            <div className={styles.tag} key={tag.id}>
                <h3 className={styles.tagHeader}>{tag.category}</h3>
                <IndiTagsContainer tag={tag} />
            </div>
        ))}
    </div>
);
export default TagsContainer;
