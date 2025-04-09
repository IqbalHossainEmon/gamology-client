import { useState } from 'react';
import TextField from '../../../../../../../../../../Shared/TextField/TextField/TextField';
import ButtonWithRipple from '../../../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import GameInfoFieldDescription from '../GameInfoFieldDescription/GameInfoFieldDescription';
import styles from './GameInfoFieldDescriptions.module.css';

function GameInfoFieldDescriptions({
	gameDescriptions,
	errorChange,
	errorMessages,
	hasDefault,
	defaultGameDescriptions,
}) {
	const [array, setArray] = useState(
		hasDefault
			? defaultGameDescriptions.descriptions.map((desc, index) => {
					const item = { id: index };

					if (desc.mainHeader) {
						item.main = true;
					}
					if (desc.description) {
						item.description = true;
					}
					if (desc.subHeader) {
						item.subHeader = true;
					}
					return item;
				})
			: [{ id: 0, mainHeader: true, description: true }]
	);
	const handleSetSortDescription = (value, name) => {
		gameDescriptions.current.gameDescriptions[name] = value;
	};

	return (
		<section className={styles.addGameDescriptions}>
			<h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&#39;s Descriptions</h3>
			<div className={styles.sortDescription}>
				<TextField
					errorChange={errorChange}
					errorMessage={errorMessages.current.gameDescriptionsError.shortDesc}
					field='textarea'
					htmlFor='short_description'
					propertyName='shortDesc'
					placeholder='Short description...'
					setState={handleSetSortDescription}
					{...(hasDefault && { defaultValue: defaultGameDescriptions.shortDesc })}
				/>
			</div>
			<div>
				{array.map((item, index) => (
					<GameInfoFieldDescription
						errorChange={errorChange}
						errorMessages={errorMessages}
						gameDescriptions={gameDescriptions}
						index={index}
						item={item}
						key={`${item.id}`}
						{...(hasDefault && {
							defaultData: defaultGameDescriptions.descriptions[index],
						})}
					/>
				))}
			</div>
			<div className={styles.buttonContainer}>
				<div className={styles.btn}>
					<ButtonWithRipple
						onClick={() => {
							setArray(prev => [
								...prev,
								{ id: prev.length, subHeader: true, description: true },
							]);
							gameDescriptions.current.gameDescriptions.descriptions.push({
								subHeader: '',
								description: '',
							});
						}}
					>
						Add more +
					</ButtonWithRipple>
				</div>
				<div className={styles.btn}>
					<ButtonWithRipple
						{...(array.length === 1 && { disabled: true })}
						onClick={() => {
							setArray(prev => {
								const prevState = [...prev];
								prevState.pop();
								return prevState;
							});
						}}
					>
						Remove last one -
					</ButtonWithRipple>
				</div>
				<div className={styles.mainBtn}>
					<ButtonWithRipple
						{...(array[array.length - 1]?.main === true && {
							disabled: true,
						})}
						onClick={() => {
							setArray(prev => {
								const prevState = [...prev];
								prevState[prevState.length - 1].mainHeader = true;
								return prevState;
							});
							gameDescriptions.current.gameDescriptions.descriptions[
								gameDescriptions.current.gameDescriptions.descriptions.length - 1
							].mainHeader = '';
						}}
					>
						Add Main Header +
					</ButtonWithRipple>
				</div>
				<div className={styles.mainBtn}>
					<ButtonWithRipple
						{...((array.length === 1 || !array[array.length - 1]?.main) && {
							disabled: true,
						})}
						onClick={() => {
							setArray(prev => {
								const prevState = [...prev];
								delete prevState[prevState.length - 1].mainHeader;
								return prevState;
							});
							delete gameDescriptions.current.gameDescriptions.descriptions[
								gameDescriptions.current.gameDescriptions.descriptions.length - 1
							].mainHeader;
						}}
					>
						Remove Main Header -
					</ButtonWithRipple>
				</div>
				<div className={styles.mainBtn}>
					<ButtonWithRipple
						onClick={() => {
							setArray(prev => [...prev, { id: prev.length, subHeader: true }]);
							gameDescriptions.current.gameDescriptions.descriptions.push({
								subHeader: '',
							});
						}}
					>
						Add Only Sub Header +
					</ButtonWithRipple>
				</div>
			</div>
		</section>
	);
}

export default GameInfoFieldDescriptions;
