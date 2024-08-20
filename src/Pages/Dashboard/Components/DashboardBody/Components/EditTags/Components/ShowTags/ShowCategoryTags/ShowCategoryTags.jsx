import TagsContainer from '../Components/TagsContainer/TagsContainer/TagsContainer';
import styles from './ShowCategoryTags.module.css';

function ShowCategoryTags({ tags, setTags }) {
  return (<div className={styles.showCategoryTags}>
      {tags.map(tag => (
          <TagsContainer
              key={tag.id}
              setTags={setTags}
              tag={tag}
          />
		))}
          </div>)
}
export default ShowCategoryTags;
