import TextField from '../../../../../../../../../../Shared/TextField/TextField';
import AddTagsUnderCategory from '../AddTagsUnderCategory/AddTagsUnderCategory';

const AddCategoryNameAndTags = ({ errorRef, errorChange, addInfoRef }) => (
    <>
        <TextField
            field="input"
            defaultValue={addInfoRef.current.category.name}
            placeholder="Enter New Category Name"
            name="category"
            errorMessage={errorRef.current.category}
            errorChange={errorChange}
            setState={(val, name) => {
                addInfoRef.current[name].name = val;
            }}
            htmlFor="category-name"
        />
        <AddTagsUnderCategory errorChange={errorChange} errorMessage={errorRef.current.tags} infoRef={addInfoRef.current.category.tags} />
    </>
);
export default AddCategoryNameAndTags;
