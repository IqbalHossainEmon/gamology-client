import TextField from '../../../../../../../../../../../../Shared/TextField/TextField/TextField';
import AddTagsUnderCategory from '../../../AddTagsUnderCategory/AddTagsUnderCategory';

function AddCategoryNameAndTags({ errorRef, errorChange, addInfoRef }) {
	return (
		<>
			<TextField
				defaultValue={addInfoRef.current.category.name}
				errorChange={errorChange}
				errorMessage={errorRef.current.category}
				field='input'
				htmlFor='category-name'
				propertyName='category'
				placeholder='Enter New Category Name'
				setState={(val, name) => {
					addInfoRef.current[name].name = val;
				}}
			/>
			<AddTagsUnderCategory
				errorChange={errorChange}
				errorMessage={errorRef.current.tags}
				infoRef={addInfoRef.current.category.tags}
			/>
		</>
	);
}
export default AddCategoryNameAndTags;
