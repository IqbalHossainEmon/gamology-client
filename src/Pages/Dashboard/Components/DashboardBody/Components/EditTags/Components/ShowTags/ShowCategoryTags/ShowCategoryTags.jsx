import TagsContainer from '../Components/TagsContainer/TagsContainer/TagsContainer';
import styles from './ShowCategoryTags.module.css';

const ShowCategoryTags = ({ tags, setModal, setTags }) => (
    <div className={styles.showCategoryTags}>
        {tags.map(tag => (
            <TagsContainer key={tag.id} tag={tag} setModal={setModal} setTags={setTags} />
        ))}
    </div>
);
export default ShowCategoryTags;
