import { useEffect, useRef, useState } from 'react';
import AdaptiveCards from '../../../../../../../../../../Shared/AdaptiveCards/AdaptiveCards/AdaptiveCards';
import ButtonWithRipple from '../../../../../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import useModal from '../../../../../../../../../../Utils/Hooks/useModal';
import useObjectUtilities from '../../../../../../../../../../Utils/Hooks/useObjectUtilities';
import EditGameShowCaseConfirmModal from '../../EditGameShowCase/Components/EditGameShowCaseConfirmModal/EditGameShowCaseConfirmModal';
import EditAdaptiveGameCardsButtons from '../Components/EditAdaptiveGameCardsButtons/EditAdaptiveGameCardsButtons';
import EditAdaptiveGameFooterBody from '../Components/EditAdaptiveGameFooterBody/EditAdaptiveGameFooterBody/EditAdaptiveGameFooterBody/EditAdaptiveGameFooterBody';
import EditAdaptiveGameFooterFooter from '../Components/EditAdaptiveGameFooterFooter/EditAdaptiveGameFooterFooter';
import EditAdaptiveHeaderComponent from '../Components/EditAdaptiveHeaderComponent/EditAdaptiveHeaderComponent/EditAdaptiveHeaderComponent';
import styles from './EditAdaptiveGameCards.module.css';

const editHeaderComponent = (
	index,
	link,
	setLink,
	cardRef,
	item,
	innerIndex,
	length,
	setAdaptiveGameCards,
	handleTitleResetRef,
	dataRef
) => (
	<EditAdaptiveHeaderComponent
		index={index}
		link={link}
		setLink={setLink}
		cardRef={cardRef}
		item={item}
		innerIndex={innerIndex}
		length={length}
		setAdaptiveGameCards={setAdaptiveGameCards}
		handleTitleResetRef={handleTitleResetRef}
		dataRef={dataRef}
	/>
);

function EditAdaptiveGameCards({ dataRef, defaultItems, parentIndex, onDelete }) {
	const { cloneObject } = useObjectUtilities();

	const [adaptiveGameCards, setAdaptiveGameCards] = useState(cloneObject(defaultItems));

	const { setContent, hideModal } = useModal();

	const eventRefs = useRef(null);
	const footerBtnRef = useRef(null);

	const prevUrlRef = useRef([]);

	useEffect(
		() => () => {
			if (prevUrlRef.current.length > 0) {
				prevUrlRef.current.forEach(url => {
					if (url) {
						URL.revokeObjectURL(url);
					}
				});
			}
		},
		[]
	);

	if (!eventRefs.current) {
		eventRefs.current = {
			onImageUpload: (file, index) => {
				if (prevUrlRef.current[index]) {
					URL.revokeObjectURL(prevUrlRef.current[index]);
				}
				prevUrlRef.current[index] = URL.createObjectURL(file);
				setAdaptiveGameCards(pre => {
					const newAdaptiveGameCard = cloneObject(pre);
					newAdaptiveGameCard[index].image = prevUrlRef.current[index];
					return newAdaptiveGameCard;
				});
				dataRef.current[parentIndex].cards[index].image = file;
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

	const handleResetRef = useRef(null);
	const handleTitleResetRef = useRef([{ current: null }, { current: null }, { current: null }]);

	return (
		<div className={styles.editAdaptiveGameCards}>
			<AdaptiveCards
				items={adaptiveGameCards}
				isEditing
				index={parentIndex}
				editingHeader={(...props) =>
					editHeaderComponent(
						...props,
						setAdaptiveGameCards,
						handleTitleResetRef,
						dataRef
					)
				}
				onFieldChange={eventRefs.current.onFieldChange}
				onImageUpload={eventRefs.current.onImageUpload}
				handleEditFooter={eventRefs.current.onEditFooterClick}
				handleResetRef={handleResetRef}
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
						handleResetRef.current();
						handleTitleResetRef.current.forEach(ref => ref && ref.current());
						dataRef.current[parentIndex].cards = cloneObject(defaultItems);
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
