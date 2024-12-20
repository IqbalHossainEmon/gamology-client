import { useRef } from 'react';
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
	tagOrCategoryRef,
	setNone,
}) {
	const eventRef = useRef(null);

	const prevTags = useRef(tags);
	prevTags.current = tags;

	console.log(tags);

	if (!eventRef.current) {
		eventRef.current = () => {
			let isValid = true;
			// if tag is selected than check for tag name and category
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
				} else {
					if (addInfoRef.current.tag?.name) {
						const isTagExist = tags.some(
							category =>
								category.optionList.findIndex(
									tag => tag.tags === addInfoRef.current.tag.name
								) !== -1
						);
						if (isTagExist) {
							errorRef.current.tag = (
								<>
									Tag Already Exists in
									<strong>
										{
											tags.find(
												category =>
													category.optionList.findIndex(
														tag =>
															tag.tags === addInfoRef.current.tag.name
													) !== -1
											).category
										}
									</strong>
									Category
								</>
							);
							isValid = false;
						} else {
							errorRef.current.tag = '';
						}
					}
					errorRef.current.category = '';
				}
			}
			// if category is selected than check for category name and tags
			else {
				if (!addInfoRef.current.category?.name) {
					console.log(addInfoRef.current);

					errorRef.current.category = 'Please Enter New Category Name';
					isValid = false;
				} else {
					const isCategoryExist = tags.some(
						category => category.category === addInfoRef.current.category.name
					);
					if (isCategoryExist) {
						errorRef.current.category = 'Category Already Exists';
						isValid = false;
					} else {
						errorRef.current.category = '';
					}
				}
				if (!addInfoRef.current.category?.tags.length) {
					if (!errorRef.current.tags) errorRef.current.tags = [];
					errorRef.current.tags[0] = 'Please Enter At Least One Tag';
					isValid = false;
				} else if (addInfoRef.current.category?.tags?.length) {
					errorRef.current.tags = [''];
					addInfoRef.current.category.tags.forEach((tag, index) => {
						if (!tag) {
							errorRef.current.tags[index] = 'Please Enter Tag Name';
							isValid = false;
						} else {
							const isTagExist = tags.some(
								category =>
									category.optionList.findIndex(t => t.tags === tag) !== -1
							);
							if (isTagExist) {
								errorRef.current.tags[index] = (
									<>
										Tag Already Exists in
										<strong>
											{
												tags.find(
													category =>
														category.optionList.findIndex(
															t => t.tags === tag
														) !== -1
												).category
											}
										</strong>
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
				handleValidation={eventRef.current}
				addInfoRef={addInfoRef}
				setNone={setNone}
			/>
		</>
	);
}
export default AddTagsOrCategories;
