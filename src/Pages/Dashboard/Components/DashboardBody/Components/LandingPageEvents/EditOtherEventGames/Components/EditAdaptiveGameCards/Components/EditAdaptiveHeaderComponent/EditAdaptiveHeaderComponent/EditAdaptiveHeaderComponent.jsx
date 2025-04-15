import { useEffect, useRef } from 'react';

import SearchGamesOrWriteLink from '../../../../../../../../Shared/SearchGamesOrWriteLink/SearchGamesOrWriteLink';
import EditAdaptiveCardDotMenu from '../Components/EditAdaptiveCardDotMenu/EditAdaptiveCardDotMenu';

function EditAdaptiveHeaderComponent({
	index,
	link,
	setLink,
	cardRef,
	item,
	innerIndex,
	length,
	setAdaptiveGameCards,
	handleTitleResetRef,
	dataRef,
}) {
	const lists = [];

	if (length !== 1) {
		lists.push({
			name: 'Delete',
			shouldHide: false,
			event: () => {
				if (innerIndex < 0 || !dataRef.current[index]?.cards) {
					return;
				}
				setAdaptiveGameCards(prev => [...prev.toSpliced(innerIndex, 1)]);
				dataRef.current[index].cards.splice(innerIndex, 1);
			},
		});
		const handleMove = direction => {
			setAdaptiveGameCards(prev => {
				const newIndex = direction === 'left' ? innerIndex - 1 : innerIndex + 1;
				if (newIndex < 0 || newIndex >= prev.length) {
					return prev;
				}
				const newArray = [...prev];
				[newArray[innerIndex], newArray[newIndex]] = [
					newArray[newIndex],
					newArray[innerIndex],
				];
				return newArray;
			});

			dataRef.current[index].cards.splice(innerIndex, 1);
			const newIndex = direction === 'left' ? innerIndex - 1 : innerIndex + 1;
			dataRef.current[index].cards.splice(newIndex, 0, item);
		};

		switch (innerIndex) {
			case 0:
				lists.push({
					name: 'Move Right',
					event: () => handleMove('right'),
				});
				break;
			case length - 1:
				lists.push({
					name: 'Move Left',
					event: () => handleMove('left'),
				});
				break;
			default:
				lists.push(
					{
						name: 'Move Left',
						event: () => handleMove('left'),
					},
					{
						name: 'Move Right',
						event: () => handleMove('right'),
					}
				);
		}
	} else {
		lists.pop();
	}

	const handleResetRef = useRef(null);

	useEffect(() => {
		if (handleTitleResetRef) {
			const refCurrent = handleTitleResetRef.current;
			refCurrent[innerIndex].current = handleResetRef.current;
			return () => {
				refCurrent[innerIndex].current = null;
			};
		}
	}, [handleResetRef, handleTitleResetRef, innerIndex]);

	return (
		<>
			<SearchGamesOrWriteLink
				defaultValue={link}
				setState={(val, field) => setLink(field, val)}
				propertyName='name'
				outerSetValuePropertyName='link'
				name={`SearchGamesOrWriteLink${`${index}${innerIndex}`}`}
				blurSet
				htmlFor={`SearchGamesOrWriteLink${`${index}${innerIndex}`}`}
				placeholder="Enter main link (/games/'game_name' for games)"
				valueResetRef={handleResetRef}
			/>
			{length > 1 && <EditAdaptiveCardDotMenu cardRef={cardRef} item={item} lists={lists} />}
		</>
	);
}
export default EditAdaptiveHeaderComponent;
