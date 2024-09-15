import FileUploadButton from '../../../../../../../../Shared/FileUploadButton/FileUploadButton/FileUploadButton';
import TextField from '../../../../../../../../Shared/TextField/TextField';
import styles from './GameInfoFieldDetails.module.css';

export default function GameInfoFieldDetails({
	gameInfo,
	errorChange,
	errorMessages,
	hasDefault,
	defaultGameInfo,
}) {
	const handleSetValue = (value, name) => {
		gameInfo.current.gameInfo[name] = value;
	};

	return (
		<section className={styles.gameDetails}>
			<h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&apos;s Details</h3>
			<TextField
				errorChange={errorChange}
				errorMessage={errorMessages.current.gameInfoError.name}
				field='input'
				name='name'
				placeholder="Game's Name"
				setState={handleSetValue}
				{...(hasDefault && { defaultValue: defaultGameInfo.name })}
				htmlFor='gameName'
			/>
			<div className={styles.flexContainer}>
				<TextField
					errorChange={errorChange}
					errorMessage={errorMessages.current.gameInfoError.developer}
					field='input'
					htmlFor='developer'
					name='developer'
					placeholder='Developer'
					setState={handleSetValue}
					{...(hasDefault && { defaultValue: defaultGameInfo.developer })}
				/>
				<TextField
					className={styles.marginRight}
					errorChange={errorChange}
					errorMessage={errorMessages.current.gameInfoError.publisher}
					field='input'
					htmlFor='publisher'
					name='publisher'
					placeholder='Publisher'
					setState={handleSetValue}
					{...(hasDefault && { defaultValue: defaultGameInfo.publisher })}
				/>
			</div>
			<div className={styles.flexContainer}>
				<FileUploadButton
					accept='image/*'
					errorChange={errorChange}
					errorMessage={errorMessages.current.gameInfoError.logo}
					htmlFor='gameLogo'
					name='logo'
					placeholder='Choose cover image'
					setState={handleSetValue}
					{...(hasDefault && { defaultValue: defaultGameInfo.logo })}
				/>
				<FileUploadButton
					accept='image/*'
					className={styles.marginRight}
					errorChange={errorChange}
					errorMessage={errorMessages.current.gameInfoError.phoneLogo}
					htmlFor='phoneLogo'
					name='phoneLogo'
					placeholder='Choose portrait cover image'
					setState={handleSetValue}
					{...(hasDefault && { defaultValue: defaultGameInfo.phoneLogo })}
				/>
			</div>
		</section>
	);
}
