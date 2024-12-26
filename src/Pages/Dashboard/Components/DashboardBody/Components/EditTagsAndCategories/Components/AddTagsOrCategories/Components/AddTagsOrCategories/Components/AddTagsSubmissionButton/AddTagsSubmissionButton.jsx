import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import useObjectUtilities from '../../../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import useToast from '../../../../../../../../../../../../Utils/Hooks/useToast';
import styles from './AddTagsSubmissionButton.module.css';

function AddTagsSubmissionButton({
	addInfoRef,
	handleValidation,
	setCategories,
	tagOrCategory,
	setErrorChange,
	setNone,
}) {
	const addBtnRef = useRef(null);

	const eventRefs = useRef(null);

	const { setToast } = useToast();

	const { cloneObject, areObjectsEqual } = useObjectUtilities();

	if (!eventRefs.current) {
		eventRefs.current = {
			handleButtonClick: () => {
				if (handleValidation()) {
					// if tag or category is valid than add tag or category to the tags
					setCategories(prev => {
						const newPrev = cloneObject(prev);
						if (tagOrCategory.current === 'Tags') {
							const index = newPrev.findIndex(
								category => category.category === addInfoRef.current.tag.category
							);
							setToast({
								title: 'Tag Added',
								message: `${addInfoRef.current.tag.name} Added to ${addInfoRef.current.tag.category}`,
								type: 'success',
							});
							newPrev[index].tags.push(addInfoRef.current.tag.name);
						} else {
							setToast({
								title: 'Category Added',
								message: `${addInfoRef.current.category.name} Category Added`,
								type: 'success',
							});
							newPrev.push({
								category: addInfoRef.current.category.name,
								tags: [...addInfoRef.current.category.tags],
							});
						}
						console.log(areObjectsEqual(newPrev, prev));

						return areObjectsEqual(newPrev, prev) ? prev : newPrev;
					});
					setNone();
					return;
				}
				setErrorChange(prev => prev + 1);
			},
		};
	}

	return (
		<div className={styles.submitBtn}>
			<button onClick={eventRefs.current.handleButtonClick} ref={addBtnRef} type='button'>
				Submit
				<ButtonWaterEffect btnRef={addBtnRef} />
			</button>
		</div>
	);
}
export default AddTagsSubmissionButton;
