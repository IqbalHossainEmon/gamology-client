import { useRef } from 'react';
import useObjectUtilities from '../../../../../../../../../../Hooks/useObjectUtilities';
import useToast from '../../../../../../../../../../Hooks/useToast';
import ButtonWaterEffect from '../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './AddTagsSubmissionButton.module.css';

function AddTagsSubmissionButton({
	addInfoRef,
	handleValidation,
	setTags,
	tagOrCategory,
	setErrorChange,
	setTagOrCategory,
}) {
	const addBtnRef = useRef(null);

	const eventRefs = useRef(null);

	const { setToast } = useToast();

	const { cloneObject, areObjectsEqual } = useObjectUtilities();

	if (!eventRefs.current) {
		eventRefs.current = {
			// LowerCase first letter of the string and remove (-) and space and make it camelCase and return it
			camelCase: str => {
				const newStr = str.toLowerCase();
				return newStr.replace(/[- ]/g, '').replace(/^[a-z]/, newStr[0].toLowerCase());
			},
			handleButtonClick: () => {
				if (handleValidation()) {
					setTags(prev => {
						const newPrev = cloneObject(prev);
						if (tagOrCategory.current) {
							const index = newPrev.findIndex(
								category => category.category === addInfoRef.current.tag.category
							);
							setToast({
								title: 'Tag Added',
								message: `${addInfoRef.current.tag.name} Added to ${addInfoRef.current.tag.category}`,
								type: 'success',
							});
							newPrev[index].optionList.push({
								text: addInfoRef.current.tag.name,
								filter: eventRefs.current.camelCase(addInfoRef.current.tag.name),
								id: newPrev[index].optionList.length,
							});
						} else {
							setToast({
								title: 'Category Added',
								message: `${addInfoRef.current.category.name} Category Added`,
								type: 'success',
							});
							newPrev.push({
								id: newPrev.length,
								category: addInfoRef.current.category.name,
								optionList: addInfoRef.current.category.tags.map((tag, i) => ({
									id: i,
									text: tag,
									filter: eventRefs.current.camelCase(tag),
								})),
							});
						}

						return areObjectsEqual(newPrev, prev) ? newPrev : prev;
					});
					addInfoRef.current = {};
					setTagOrCategory(null);
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
