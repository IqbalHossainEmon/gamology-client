import { useEffect, useRef, useState } from 'react';
import TextField from '../../../../../../../../../../Shared/TextField/TextField';
import SelectionFieldWithErrorMessage from '../SelectionFieldWithErrorMessage/SelectionFieldWithErrorMessage';

const AddTagsNameAndCategory = ({ errorRef, errorChange, addInfoRef, tags }) => {
    const [parentErrorShow, setParentErrorShow] = useState(true);

    const parentErrorShowRef = useRef(errorChange);
    parentErrorShowRef.current = parentErrorShow;

    const handleCheck = () => {
        if (errorRef.current.tag.props) {
            setParentErrorShow(false);
        }
    };

    useEffect(() => {
        if (!parentErrorShowRef.current) {
            setParentErrorShow(true);
        }
    }, [errorChange]);

    return (
        <div>
            <TextField
                field="input"
                placeholder="Enter New  Tag Name"
                defaultValue={addInfoRef.current.tag.name}
                name="tag"
                errorMessage={errorRef.current.tag}
                errorChange={errorChange}
                parentErrorShow={parentErrorShow}
                setState={(val, name) => {
                    addInfoRef.current[name].name = val;
                }}
                htmlFor="tag-name"
            />

            <SelectionFieldWithErrorMessage
                htmlFor="category"
                placeholder="Select Category"
                list={tags.map(tag => tag.category)}
                name="category"
                handleCheck={handleCheck}
                setState={val => {
                    addInfoRef.current.tag.category = val;
                }}
                errorMessage={errorRef.current.category}
                errorChange={errorChange}
            />
        </div>
    );
};
export default AddTagsNameAndCategory;
