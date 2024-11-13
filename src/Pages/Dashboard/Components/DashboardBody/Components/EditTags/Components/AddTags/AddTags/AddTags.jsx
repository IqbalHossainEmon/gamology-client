import { useRef, useState } from 'react';
import SelectionField from '../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import AddTagsOrCategories from '../Components/AddTagsOrCategories/AddTagsOrCategories/AddTagsOrCategories';
import styles from './AddTags.module.css';

function AddTags({ tags, setTags }) {
	const [tagOrCategory, setTagOrCategory] = useState('');
	const [errorChange, setErrorChange] = useState(0);
	const addInfoRef = useRef({});
	const errorRef = useRef(null);

	const tagOrCategoryRef = useRef(tagOrCategory);
	tagOrCategoryRef.current = tagOrCategory;

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleValidation: () => {
				let isValid = true;
				if (tagOrCategoryRef.current) {
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
																tag.tags ===
																addInfoRef.current.tag.name
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
				} else {
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
			},
			setState: val => {
				switch (val) {
					case 'Tags':
						setTagOrCategory('tag');
						addInfoRef.current.tag = {
							name: addInfoRef.current.category?.name
								? addInfoRef.current.category.name
								: '',
							category: '',
						};
						if (addInfoRef.current.category) {
							delete addInfoRef.current.category;
						}
						errorRef.current = { tag: '', category: '' };
						break;
					case 'Category':
						setTagOrCategory('category');
						addInfoRef.current.category = {
							name: addInfoRef.current.tag?.name || '',
							tags: [''],
						};
						if (addInfoRef.current.tag) {
							delete addInfoRef.current.tag;
						}
						errorRef.current = { category: '', tags: [''] };
						break;
					default:
						setTagOrCategory('');
						addInfoRef.current = {};
						break;
				}
			},
		};
	}

	const prevTagOrCategoryRef = useRef('');

	return (
		<div className={styles.addTags}>
			<div className={styles.selectionField}>
				<SelectionField
					htmlFor='add-what'
					list={['Tags', 'Category']}
					name='Add What'
					none
					placeholder='Add What?'
					setState={eventRefs.current.setState}
				/>
			</div>
			{tagOrCategory && (
				<AddTagsOrCategories
					tagOrCategory={tagOrCategory}
					setTagOrCategory={setTagOrCategory}
					tags={tags}
					setTags={setTags}
					setErrorChange={setErrorChange}
					addInfoRef={addInfoRef}
					errorChange={errorChange}
					errorRef={errorRef}
					tagOrCategoryRef={tagOrCategoryRef}
					eventRefs={eventRefs}
					setNone={eventRefs.current.setState}
				/>
			)}
		</div>
	);
}
export default AddTags;
