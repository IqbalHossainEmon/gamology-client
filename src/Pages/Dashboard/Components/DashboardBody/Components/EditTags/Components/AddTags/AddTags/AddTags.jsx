import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import SelectionField from '../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import AddCategoryNameAndTags from '../Components/AddCategoryNameAndTags/AddCategoryNameAndTags';
import AddTagsNameAndCategory from '../Components/AddTagsNameAndCategory/AddTagsNameAndCategory';
import styles from './AddTags.module.css';

function AddTags({ tags, setTags }) {
	const [tagOrCategory, setTagOrCategory] = useState(null);
	const [errorChange, setErrorChange] = useState(0);
	const addBtnRef = useRef(null);
	const addInfoRef = useRef({});
	const errorRef = useRef({});
	const handleValidation = () => {
		let isValid = true;
		if (tagOrCategory) {
			if (!addInfoRef.current.tag.name) {
				errorRef.current.tag = 'Please Enter New Tag Name';
				isValid = false;
			} else {
				errorRef.current.tag = '';
			}
			if (!addInfoRef.current.tag.category) {
				errorRef.current.category = 'Please Select Category';
				isValid = false;
			} else {
				if (addInfoRef.current.tag.name) {
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
													tag => tag.tags === addInfoRef.current.tag.name
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
			if (!addInfoRef.current.category.name) {
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
			if (!addInfoRef.current.category.tags.length) {
				errorRef.current.tags[0] = 'Please Enter At Least One Tag';
				isValid = false;
			} else if (addInfoRef.current.category.tags.length) {
				errorRef.current.tags = [''];
				addInfoRef.current.category.tags.forEach((tag, index) => {
					if (!tag) {
						errorRef.current.tags[index] = 'Please Enter Tag Name';
						isValid = false;
					} else {
						const isTagExist = tags.some(
							category => category.optionList.findIndex(t => t.tags === tag) !== -1
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
	// LowerCase first letter of the string and remove (-) and space and make it camelCase and return it
	const camelCase = str => {
		const newStr = str.toLowerCase();
		return newStr.replace(/[- ]/g, '').replace(/^[a-z]/, newStr[0].toLowerCase());
	};

	return (
		<div className={styles.addTags}>
			<h3 className={styles.addHeader}>
				Add
				{tagOrCategory ? 'Tag' : 'Category'}
			</h3>

			<div className={styles.selectionField}>
				<SelectionField
					htmlFor="add-what"
					list={['Tags', 'Category']}
					name="Add What"
					none
					placeholder="Add What?"
					setState={val => {
						switch (val) {
							case 'Tags':
								setTagOrCategory(true);
								addInfoRef.current.tag = {
									name: addInfoRef.current?.category?.name
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
								setTagOrCategory(false);
								addInfoRef.current.category = {
									name: addInfoRef.current?.tag?.name
										? addInfoRef.current.tag.name
										: '',
									tags: [''],
								};
								if (addInfoRef.current.tag) {
									delete addInfoRef.current.tag;
								}
								errorRef.current = { category: '', tags: [''] };
								break;
							default:
								setTagOrCategory(null);
								addInfoRef.current = {};
								break;
						}
					}}
				/>
			</div>

			{tagOrCategory !== null && (
				<>
					<div>
						{tagOrCategory ? (
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

					<div className={styles.submitBtn}>
						<button
							onClick={() => {
								if (handleValidation()) {
									setTags(prev => {
										const newPrev = JSON.parse(JSON.stringify(prev));
										if (tagOrCategory) {
											const index = newPrev.findIndex(
												category =>
													category.category ===
													addInfoRef.current.tag.category
											);

											newPrev[index].optionList.push({
												text: addInfoRef.current.tag.name,
												filter: camelCase(addInfoRef.current.tag.name),
												id: newPrev[index].optionList.length,
											});
										} else {
											newPrev.push({
												id: newPrev.length,
												category: addInfoRef.current.category.name,
												optionList: addInfoRef.current.category.tags.map(
													(tag, i) => ({
														id: i,
														text: tag,
														filter: camelCase(tag),
													})
												),
											});
										}

										return JSON.stringify(newPrev) !== JSON.stringify(prev)
											? newPrev
											: prev;
									});
									return;
								}
								setErrorChange(prev => prev + 1);
							}}
							ref={addBtnRef}
							type="button"
						>
							Submit
							<ButtonWaterEffect btnRef={addBtnRef} />
						</button>
					</div>
				</>
			)}
		</div>
	);
}
export default AddTags;
