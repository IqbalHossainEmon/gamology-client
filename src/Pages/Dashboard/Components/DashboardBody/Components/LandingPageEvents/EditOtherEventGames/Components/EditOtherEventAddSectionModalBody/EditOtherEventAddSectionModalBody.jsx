import { useEffect, useRef, useState } from 'react';
import useObjectUtilities from '../../../../../../../../../Utils/Hooks/useObjectUtilities';
import SelectionFieldWithErrorMessage from '../../../../EditTagsAndCategories/Components/AddTagsOrCategories/Components/AddTagsOrCategories/Components/AddTagsNameAndCategory/SelectionFieldWithErrorMessage/SelectionFieldWithErrorMessage';
import styles from './EditOtherEventAddSectionModalBody.module.css';

const emptyDataShowCase = [
	{ id: 0, games: [] },
	{ id: 1, games: [] },
	{ id: 2, games: [] },
];

const emptyDataAdaptiveCard = [
	{ id: 0, cards: [] },
	{ id: 1, cards: [] },
	{ id: 2, cards: [] },
];
function EditOtherEventAddSectionModalBody({ setAllItems, submitRef, sectionsRefs, hideModal }) {
	const [errorChange, setErrorChange] = useState(0);

	const errorMessage = useRef('');

	const sectionTypeRef = useRef('');

	const eventRefs = useRef(null);

	const { cloneObject } = useObjectUtilities();

	if (!eventRefs.current) {
		eventRefs.current = {
			onSubmit: () => {
				if (!sectionTypeRef.current) {
					errorMessage.current = 'Please selection a type first';
					setErrorChange(prev => prev + 1);
					return;
				}
				if (errorMessage.current) {
					errorMessage.current = '';
				}

				const isShowcase = sectionTypeRef.current === 'Showcase';
				let newSection;

				setAllItems(prev => {
					const temp = cloneObject(prev);
					if (isShowcase) {
						newSection = {
							id: temp.length,
							type: 'showcase',
							games: cloneObject(emptyDataShowCase),
						};
						temp.push(newSection);
					} else {
						newSection = {
							id: temp.length,
							type: 'adaptiveCard',
							cards: cloneObject(emptyDataAdaptiveCard),
						};
						temp.push(newSection);
					}

					return temp;
				});

				sectionsRefs.current.push(newSection);

				hideModal();
			},
		};
	}

	useEffect(() => {
		const submitBtn = submitRef.current;

		if (submitBtn) {
			submitBtn.addEventListener('click', eventRefs.current.onSubmit);
			return () => submitBtn.removeEventListener('click', eventRefs.current.onSubmit);
		}
	}, [submitRef]);

	return (
		<div className={styles.editOtherEventAddSectionModalBody}>
			<SelectionFieldWithErrorMessage
				className={styles.selectionField}
				htmlFor='add-section'
				list={['Showcase', 'Adaptive Card']}
				name='Add What'
				placeholder='Section Type'
				setState={val => {
					sectionTypeRef.current = val;
				}}
				errorChange={errorChange}
				errorMessage={errorMessage.current}
			/>
		</div>
	);
}
export default EditOtherEventAddSectionModalBody;
