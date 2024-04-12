import TagsContainer from '../Components/TagsContainer/TagsContainer';
import styles from './ShowCategoryTags.module.css';

const ShowCategoryTags = ({ tags, setModal }) => (
    <div className={styles.showCategoryTags}>
        {tags.map(tag => (
            <TagsContainer key={tag.id} tag={tag} setModal={setModal} />
        ))}
    </div>
);
export default ShowCategoryTags;
