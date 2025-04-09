import { useRef, useState } from 'react';
import AdaptiveCards from '../../../../../../../../../../Shared/AdaptiveCards/AdaptiveCards/AdaptiveCards';
import ButtonWithRipple from '../../../../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import useModal from '../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import SearchGamesOrWriteLink from '../../../../../../Shared/SearchGamesOrWriteLink/SearchGamesOrWriteLink';
import EditGameShowCaseConfirmModal from '../../EditGameShowCase/Components/EditGameShowCaseConfirmModal/EditGameShowCaseConfirmModal';
import EditAdaptiveCardDotMenu from '../Components/EditAdaptiveCardDotMenu/EditAdaptiveCardDotMenu';
import EditAdaptiveGameCardsButtons from '../Components/EditAdaptiveGameCardsButtons/EditAdaptiveGameCardsButtons';
import EditAdaptiveGameFooterBody from '../Components/EditAdaptiveGameFooterBody/EditAdaptiveGameFooterBody/EditAdaptiveGameFooterBody/EditAdaptiveGameFooterBody';
import EditAdaptiveGameFooterFooter from '../Components/EditAdaptiveGameFooterFooter/EditAdaptiveGameFooterFooter';
import styles from './EditAdaptiveGameCards.module.css';

function editHeaderComponent(
	index,
	link,
	setLink,
	cardRef,
	item,
	innerIndex,
	length,
	setAdaptiveGameCards
) {
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
			/>
			{length > 1 && <EditAdaptiveCardDotMenu cardRef={cardRef} item={item} lists={lists} />}
		</>
	);
}

function EditAdaptiveGameCards({ dataRef, defaultItems, parentIndex, onDelete }) {
	const [adaptiveGameCards, setAdaptiveGameCards] = useState(defaultItems);

	const { cloneObject } = useObjectUtilities();
	const { setContent, hideModal } = useModal();

	const eventRefs = useRef(null);

	const footerBtnRef = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			onImageUpload: (file, index) => {
				setAdaptiveGameCards(pre => {
					const newAdaptiveGameCard = cloneObject(pre);
					newAdaptiveGameCard[index].image = URL.createObjectURL(file);
					dataRef.current[index] = newAdaptiveGameCard[index];
					return newAdaptiveGameCard;
				});
			},
			onFieldChange: (value, field, index) => {
				dataRef.current[parentIndex].cards[index][field] = value;
			},
			onEditFooterClick: (e, index, innerIndex, data, header) => {
				setContent({
					title: `${header} Footer`,
					body: (
						<EditAdaptiveGameFooterBody
							btnRef={footerBtnRef}
							index={innerIndex}
							setFooterMainData={eventRefs.current.onFieldChange}
							setAdaptiveGameCards={setAdaptiveGameCards}
							data={data}
							hideModal={hideModal}
						/>
					),
					footer: <EditAdaptiveGameFooterFooter btnRef={footerBtnRef} />,
					e,
				});
			},
		};
	}

	return (
		<div className={styles.editAdaptiveGameCards}>
			<AdaptiveCards
				items={adaptiveGameCards}
				isEditing
				index={parentIndex}
				editingHeader={(...props) => editHeaderComponent(...props, setAdaptiveGameCards)}
				onFieldChange={eventRefs.current.onFieldChange}
				onImageUpload={eventRefs.current.onImageUpload}
				handleEditFooter={eventRefs.current.onEditFooterClick}
			/>
			<EditAdaptiveGameCardsButtons
				adaptiveGameCards={adaptiveGameCards}
				setAdaptiveGameCards={setAdaptiveGameCards}
				mainDataRef={dataRef}
				parentIndex={parentIndex}
			/>
			<div className={styles.btnContainer}>
				<ButtonWithRipple
					onClick={() => {
						setAdaptiveGameCards(cloneObject(defaultItems));
						dataRef.current = cloneObject(defaultItems);
					}}
				>
					Reset
				</ButtonWithRipple>
				<ButtonWithRipple
					onClick={e =>
						setContent({
							title: 'Delete Game Showcase',
							body: <p>Are you sure you want to delete this Section?</p>,
							footer: (
								<EditGameShowCaseConfirmModal
									onConfirm={() => {
										hideModal();
										onDelete(parentIndex);
									}}
								/>
							),
							e,
						})
					}
				>
					Delete
				</ButtonWithRipple>
			</div>
		</div>
	);
}
export default EditAdaptiveGameCards;
