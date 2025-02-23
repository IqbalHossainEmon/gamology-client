import { useEffect, useRef, useState } from 'react';
import useObjectUtilities from '../../../../../../../Utils/Hooks/useObjectUtilities';
import ButtonWithRipple from '../../../Shared/ButtonWithRipple/ButtonWithRipple';
import OuterErrorMessage from '../../../Shared/OuterErrorMessage/OuterErrorMessage';
import GameInfoFieldBanner from '../Components/GameInfoFieldBanner/GameInfoFieldBanner/GameInfoFieldBanner';
import GameInfoFieldDescriptions from '../Components/GameInfoFieldDescriptions/GameInfoFieldDescriptions/GameInfoFieldDescriptions';
import GameInfoFieldDetails from '../Components/GameInfoFieldDetails/GameInfoFieldDetails';
import GameInfoFieldSpecifications from '../Components/GameInfoFieldSpecifications/GameInfoFieldSpecifications/GameInfoFieldSpecifications';
import GameInfoFieldTags from '../Components/GameInfoFieldTags/GameInfoFieldTags/GameInfoFieldTags';
import useGameInfoFieldLogics from '../Utils/Hooks/useGameInfoFieldLogics';
import styles from './GameInfoField.module.css';

export default function GameInfoField({ handleGameInfo, hasDefault, defaultData }) {
	const [loading, setLoading] = useState(true);
	const gameData = useRef({
		gameInfo: {
			name: '',
			developer: '',
			publisher: '',
			logo: {},
			phoneLogo: {},
			releaseDate: { day: '', month: '', year: '' },
			price: '0.00',
		},
		gameBanner: [{ cover: '', thumb: '', type: '' }],
		gameDescriptions: {
			descriptions: [{ mainHeader: '', subHeader: '', description: '' }],
		},
		gameSpecifications: {
			spec: [
				{
					for: 'Windows',
					systemReq: [
						[
							{ key: '', value: '' },
							{ key: '', value: '' },
						],
					],
					isActive: false,
				},
				{
					for: 'MacOs',
					systemReq: [
						[
							{ key: '', value: '' },
							{ key: '', value: '' },
						],
					],
					isActive: false,
				},
				{
					for: 'Linux',
					systemReq: [
						[
							{ key: '', value: '' },
							{ key: '', value: '' },
						],
					],
					isActive: false,
				},
			],
			others: { key: '', value: '' },
			copyWrite: '',
			policy: '',
		},
		gameTags: {},
	});
	const [errorChange, setErrorChange] = useState(0);

	const errorMessages = useRef({
		gameInfoError: {
			name: '',
			developer: '',
			publisher: '',
			logo: '',
			phoneLogo: '',
			releaseDate: '',
		},
		gameBannerError: [{ cover: '', thumb: '', type: '' }],
		gameTagsError: {},
		gameDescriptionsError: { descriptions: [], shortDesc: '' },
		gameSpecificationsError: {
			spec: [{}, {}, {}],
			others: [],
		},
		outerErrorMessage: '',
	});
	const { checkValidation, handleUnnecessaryRemove } = useGameInfoFieldLogics({
		gameData,
		errorMessages,
	});

	const handleSubmit = e => {
		e.preventDefault();
		if (checkValidation()) {
			errorMessages.current.previousOuterErrorMessage =
				errorMessages.current.outerErrorMessage;
			setErrorChange(prev => prev + 1);
			return;
		}
		if (errorMessages.current.previousOuterErrorMessage) {
			errorMessages.current.previousOuterErrorMessage = '';
			setErrorChange(prev => prev + 1);
		}
		const cleanData = handleUnnecessaryRemove();
		const errorMessage = handleGameInfo(cleanData);
		errorMessages.current.outerErrorMessage = errorMessage;
		if (errorMessages.current.outerErrorMessage !== errorMessages.current.isThereError) {
			setErrorChange(prev => prev + 1);
		}
		errorMessages.current.isThereError = errorMessage;
	};

	const { cloneObject } = useObjectUtilities();

	useEffect(() => {
		const categories = ['Genre', 'Features'];
		if (defaultData && hasDefault && Object.keys(defaultData).length) {
			const defaultGameData = cloneObject(defaultData);
			const specList = defaultGameData.gameSpecifications.spec.map(spec => spec.for);
			const defSpec = {
				systemReq: [
					[
						{ key: '', value: '' },
						{ key: '', value: '' },
					],
				],
				isActive: false,
			};
			['Windows', 'MacOs', 'Linux'].forEach((spec, index) => {
				if (!specList.includes(spec)) {
					const newSpec = cloneObject(defSpec);
					newSpec.for = spec;
					switch (index) {
						case 0:
							defaultGameData.gameSpecifications.spec.unshift(newSpec);
							break;
						case 1:
							defaultGameData.gameSpecifications.spec.splice(1, 0, newSpec);
							break;
						default:
							defaultGameData.gameSpecifications.spec.push(newSpec);
					}
				}
			});
			gameData.current = defaultGameData;
			// Fetch game categories
			gameData.current.gameTags = categories.reduce((acc, category) => {
				const obj = {};
				const defaultCategory = hasDefault ? defaultData.gameTags[category] : {};
				if (hasDefault && Object.keys(defaultCategory).length) {
					obj[category] = defaultCategory;
				} else {
					obj[category] = {};
				}
				return { ...acc, ...obj };
			}, {});
		} else if (!gameData.current.gameTags[categories[0]]) {
			gameData.current.gameTags = categories.reduce((acc, category) => {
				const obj = {};
				obj[category] = {};
				return { ...acc, ...obj };
			}, {});
		}

		if (
			hasDefault
				? Object.keys(defaultData).length && Object.keys(gameData.current.gameTags).length
				: Object.keys(gameData.current.gameTags).length
		) {
			setLoading(false);
		}
	}, [cloneObject, defaultData, hasDefault]);

	return (
		<div className={styles.gameInfoField}>
			<h1 className={styles.header}>
				{hasDefault ? 'Edit The Game' : 'Add New Game to the collection'}
			</h1>

			{loading ? (
				<h3>Loading...</h3>
			) : (
				<form>
					<GameInfoFieldDetails
						errorChange={errorChange}
						errorMessages={errorMessages}
						gameInfo={gameData}
						hasDefault={hasDefault}
						{...(hasDefault && { defaultGameInfo: defaultData.gameInfo })}
					/>
					<GameInfoFieldBanner
						errorChange={errorChange}
						errorMessages={errorMessages}
						gameBanner={gameData}
						hasDefault={hasDefault}
						{...(hasDefault && { defaultGameBanner: defaultData.gameBanner })}
					/>
					<GameInfoFieldTags
						errorChange={errorChange}
						errorMessages={errorMessages}
						gameData={gameData}
						hasDefault={hasDefault}
						{...(hasDefault && { defaultGameTags: defaultData.gameTags })}
						{...(hasDefault && {
							defaultReleaseDate: defaultData.gameInfo.releaseDate,
						})}
						{...(hasDefault && { defaultPrice: defaultData.gameInfo.price })}
					/>
					<GameInfoFieldDescriptions
						errorChange={errorChange}
						errorMessages={errorMessages}
						gameDescriptions={gameData}
						hasDefault={hasDefault}
						{...(hasDefault && {
							defaultGameDescriptions: defaultData.gameDescriptions,
						})}
					/>
					<GameInfoFieldSpecifications
						errorChange={errorChange}
						errorMessages={errorMessages}
						gameSpecifications={gameData}
						hasDefault={hasDefault}
						{...(hasDefault && {
							defaultGameSpecifications: defaultData.gameSpecifications,
						})}
					/>
					<OuterErrorMessage
						errorChange={errorChange}
						errorMessage={errorMessages.current.outerErrorMessage}
					/>
					<ButtonWithRipple onClick={handleSubmit}>Submit</ButtonWithRipple>
				</form>
			)}
		</div>
	);
}
