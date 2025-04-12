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
}) {
	const lists = [];

	if (length !== 1) {
		lists.push({
			name: 'Delete',
			shouldHide: false,
			event: () => {
				setAdaptiveGameCards(pre => {
					const newAdaptiveGameCard = [...pre];
					newAdaptiveGameCard.splice(innerIndex, 1);
					return newAdaptiveGameCard;
				});
			},
		});
		const handleMove = direction => {
			setAdaptiveGameCards(pre => {
				const newAdaptiveGameCard = [...pre];
				const currentItem = newAdaptiveGameCard.splice(innerIndex, 1)[0];
				const newIndex = direction === 'left' ? innerIndex - 1 : innerIndex + 1;
				newAdaptiveGameCard.splice(newIndex, 0, currentItem);
				return newAdaptiveGameCard;
			});
		};

		if (innerIndex === 0) {
			lists.push({
				name: 'Move Right',
				event: () => handleMove('right'),
			});
		} else if (innerIndex === length - 1) {
			lists.push({
				name: 'Move Left',
				event: () => handleMove('left'),
			});
		} else {
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
				index={index}
				defaultValue={link}
				setState={(val, field) => setLink(field, val)}
				propertyName='name'
				outerSetValuePropertyName='link'
				name={`SearchGamesOrWriteLink${index}`}
				blurSet
				htmlFor={`SearchGamesOrWriteLink${index}`}
				placeholder="Enter main link (/games/'game_name' for games)"
				valueResetRef={handleResetRef}
			/>
			{length > 1 && <EditAdaptiveCardDotMenu cardRef={cardRef} item={item} lists={lists} />}
		</>
	);
}
export default EditAdaptiveHeaderComponent;
