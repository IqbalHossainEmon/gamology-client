import AddCategoryNameAndTags from '../Components/AddCategoryNameAndTags/AddCategoryNameAndTags';
import AddTagsNameAndCategory from '../Components/AddTagsNameAndCategory/AddTagsNameAndCategory/AddTagsNameAndCategory';
import AddTagsSubmissionButton from '../Components/AddTagsSubmissionButton/AddTagsSubmitionButton';
import styles from './AddTagsOrCategories.module.css';

function AddTagsOrCategories({
	tagOrCategory,
	tags,
	setTags,
	setErrorChange,
	addInfoRef,
	errorChange,
	errorRef,
	eventRefs,
	tagOrCategoryRef,
	setNone,
}) {
	return (
		<>
			<h3 className={styles.addHeader}>Add {tagOrCategory ? 'Tags' : 'Category'}</h3>
			<div>
				{tagOrCategory === 'Tags' ? (
					<AddTagsNameAndCategory
						addInfoRef={addInfoRef}
						errorChange={errorChange}
						errorRef={errorRef}
						tags={tags}
					/>
				) : (
					<AddCategoryNameAndTags
						addInfoRef={addInfoRef}
						errorChange={errorChange}
						errorRef={errorRef}
					/>
				)}
			</div>
			<AddTagsSubmissionButton
				setTags={setTags}
				tagOrCategory={tagOrCategoryRef}
				setErrorChange={setErrorChange}
				handleValidation={eventRefs.current.handleValidation}
				addInfoRef={addInfoRef}
				setNone={setNone}
			/>
		</>
	);
}
export default AddTagsOrCategories;
