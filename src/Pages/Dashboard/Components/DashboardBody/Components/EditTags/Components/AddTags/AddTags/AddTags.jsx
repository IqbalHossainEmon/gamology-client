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
			setState: val => {
				switch (val) {
					case 'Tags':
						setTagOrCategory('Tags');
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
					case 'Categories':
						setTagOrCategory('Categories');
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

	return (
		<div className={styles.addTags}>
			<div className={styles.selectionField}>
				<SelectionField
					htmlFor='add-what'
					list={['Tags', 'Categories']}
					defaultValue={tagOrCategory}
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
					setNone={eventRefs.current.setState}
				/>
			)}
		</div>
	);
}
export default AddTags;
