import { useRef } from 'react';
import AddCategoryNameAndTags from '../Components/AddCategoryNameAndTags/AddCategoryNameAndTags';
import AddTagsNameAndCategory from '../Components/AddTagsNameAndCategory/AddTagsNameAndCategory/AddTagsNameAndCategory';
import AddTagsSubmissionButton from '../Components/AddTagsSubmissionButton/AddTagsSubmissionButton';
import styles from './AddTagsOrCategories.module.css';

function AddTagsOrCategories({
	tagOrCategory,
	categories,
	setCategories,
	setErrorChange,
	addInfoRef,
	errorChange,
	errorRef,
	tagOrCategoryRef,
	setNone,
}) {
	const eventRef = useRef(null);

	const prevCategories = useRef(categories);
	prevCategories.current = categories;

	if (!eventRef.current) {
		// This function is used to validate the input fields before submission
		eventRef.current = () => {
			let isValid = true;
			if (tagOrCategoryRef.current === 'Tags') {
				if (!addInfoRef.current.tag?.name) {
					errorRef.current.tag = 'Please Enter New Tag Name';
					isValid = false;
				} else {
					errorRef.current.tag = '';
				}
				if (!addInfoRef.current.tag?.category) {
					errorRef.current.category = 'Please Select Category';
					isValid = false;
				} else errorRef.current.category = '';

				if (addInfoRef.current.tag?.name) {
					const isTagExist = prevCategories.current.some(category =>
						category.tags.includes(addInfoRef.current.tag.name)
					);
					if (isTagExist) {
						errorRef.current.tag = (
							<>
								Tag Already Exists in{' '}
								<strong>
									{
										prevCategories.current.find(category =>
											category.tags.includes(addInfoRef.current.tag.name)
										).category
									}
								</strong>{' '}
								Category
							</>
						);
						isValid = false;
					} else {
						errorRef.current.tag = '';
					}
				}
			}
			// if category is selected than check for category name and tags
			else {
				if (!addInfoRef.current.category?.name) {
					errorRef.current.category = 'Please Enter New Category Name';
					isValid = false;
				} else {
					const isCategoryExist = prevCategories.current.some(
						category => category.category === addInfoRef.current.category.name
					);
					const isCategoryExistInTags = prevCategories.current.some(category =>
						category.tags.includes(addInfoRef.current.category.name)
					);
					if (isCategoryExist) {
						errorRef.current.category = 'Category Already Exists';
						isValid = false;
					} else if (isCategoryExistInTags) {
						errorRef.current.category = 'Category Already Exists in Tags';
					} else {
						errorRef.current.category = '';
					}
				}
				if (addInfoRef.current.category?.tags?.length) {
					errorRef.current.tags = [''];
					addInfoRef.current.category.tags.forEach((tag, index) => {
						if (!tag) {
							errorRef.current.tags[index] = 'Please Enter Tag Name';
							isValid = false;
						} else {
							const isTagExist = prevCategories.current.some(category =>
								category.tags.includes(tag)
							);
							if (isTagExist) {
								errorRef.current.tags[index] = (
									<>
										Tag Already Exists in{' '}
										<strong>
											{
												prevCategories.current.find(category =>
													category.tags.includes(tag)
												).category
											}
										</strong>{' '}
										Category
									</>
								);
								isValid = false;
							}
						}
					});
				} else {
					errorRef.current.tags = [];
				}
			}
			return isValid;
		};
	}

	return (
		<>
			<h3 className={styles.addHeader}>Add {tagOrCategory}</h3>
			<div>
				{tagOrCategory === 'Tags' ? (
					<AddTagsNameAndCategory
						addInfoRef={addInfoRef}
						errorChange={errorChange}
						errorRef={errorRef}
						categories={categories}
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
				setCategories={setCategories}
				tagOrCategory={tagOrCategoryRef}
				setErrorChange={setErrorChange}
				handleValidation={eventRef.current}
				addInfoRef={addInfoRef}
				setNone={setNone}
			/>
		</>
	);
}
export default AddTagsOrCategories;
