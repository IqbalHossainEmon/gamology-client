import TagsContainer from '../Components/TagsContainer/TagsContainer';
import styles from './ShowCategoryTags.module.css';

const ShowCategoryTags = ({ tags }) => (
    <div className={styles.showCategoryTags}>
        {tags.map(tag => (
            <TagsContainer key={tag.id} tag={tag} />
        ))}
    </div>
);
export default ShowCategoryTags;
