import SingleTag from '../SingleTag/SingleTag';
import styles from './IndiTagsContainer.module.css';

const IndiTagsContainer = ({ tag }) => (
    <ul className={styles.tagList}>
        {tag.optionList.map(option => (
            <SingleTag key={option.id} tags={option.tags} />
        ))}
    </ul>
);
export default IndiTagsContainer;
