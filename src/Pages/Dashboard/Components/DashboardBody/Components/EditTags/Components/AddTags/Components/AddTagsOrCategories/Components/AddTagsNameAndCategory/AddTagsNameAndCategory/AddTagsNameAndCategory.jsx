import { useEffect, useRef, useState } from 'react';
import TextField from '../../../../../../../../../../../../../Shared/TextField/TextField/TextField';
import SelectionFieldWithErrorMessage from '../SelectionFieldWithErrorMessage/SelectionFieldWithErrorMessage';

function AddTagsNameAndCategory({ errorRef, errorChange, addInfoRef, tags }) {
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
				defaultValue={addInfoRef.current.tag.name}
				errorChange={errorChange}
				errorMessage={errorRef.current.tag}
				field='input'
				htmlFor='tag-name'
				name='tag'
				parentErrorShow={parentErrorShow}
				placeholder='Enter New  Tag Name'
				setState={(val, name) => {
					addInfoRef.current[name].name = val;
				}}
			/>
			<SelectionFieldWithErrorMessage
				errorChange={errorChange}
				errorMessage={errorRef.current.category}
				handleCheck={handleCheck}
				htmlFor='category'
				list={tags.map(tag => tag.category)}
				name='category'
				placeholder='Select Category'
				setState={val => {
					addInfoRef.current.tag.category = val;
				}}
			/>
		</div>
	);
}
export default AddTagsNameAndCategory;
