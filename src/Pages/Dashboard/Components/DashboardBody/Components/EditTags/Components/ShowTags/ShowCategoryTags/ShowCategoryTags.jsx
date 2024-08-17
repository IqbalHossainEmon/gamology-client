import TagsContainer from '../Components/TagsContainer/TagsContainer/TagsContainer';
import styles from './ShowCategoryTags.module.css';

const ShowCategoryTags = ({ tags, setTags }) => (
	<div className={styles.showCategoryTags}>
		{tags.map(tag => (
			<TagsContainer key={tag.id} tag={tag} setTags={setTags} />
		))}
	</div>
);
export default ShowCategoryTags;
