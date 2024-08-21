import { useState } from 'react';
import FileUploadButton from '../../../../../../../../../Shared/FileUploadButton/FileUploadButton/FileUploadButton';
import SelectionField from '../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import CoverImageVideoContainer from '../CoverImageVideoContainer/CoverImageVideoContainer/CoverImageVideoContainer';
import styles from './BannerInputFieldContainer.module.css';

export default function BannerInputFieldContainer({
	number,
	gameBanner,
	errorChange,
	errorMessages,
	defaultGameBanner,
	hasDefault,
}) {
	const [type, setType] = useState(
		hasDefault && defaultGameBanner?.type ? defaultGameBanner.type : ''
	);
	const handleSetValues = (value, name) => {
		gameBanner.current.gameBanner[number][name] = value;

		if (errorMessages[number]?.type) {
			delete errorMessages[number].type;
			delete errorMessages[number].thumb;
			delete errorMessages[number].cover;
		}
	};

	return (
		<div className={styles.textFieldContainer}>
			<CoverImageVideoContainer
				errorChange={errorChange}
				errorMessage={errorMessages[number]?.cover}
				handleSetValues={handleSetValues}
				name="cover"
				number={number}
				type={type}
				{...(hasDefault && { defaultData: defaultGameBanner?.cover })}
				hasDefault={hasDefault}
			/>

			<FileUploadButton
				{...(type || { disabled: true })}
				accept="image/*"
				defaultValue=""
				errorChange={errorChange}
				errorMessage={errorMessages[number]?.thumb}
				field="input"
				htmlFor={`coverThumb${number}`}
				name="thumb"
				placeholder={
					type.type
						? `Choose Game's Banner ${type.type}'s thumbnail`
						: 'Select Content Type First'
				}
				setState={handleSetValues}
				{...(hasDefault && { defaultValue: defaultGameBanner?.thumb })}
			/>

			<div className={styles.selectContainer}>
				<SelectionField
					htmlFor={number}
					list={['image', 'video']}
					name="type"
					placeholder="Content Type"
					setState={(value, name) => {
						setType(value);
						handleSetValues(value, name);
					}}
					{...(hasDefault && { defaultValue: defaultGameBanner?.type })}
				/>
			</div>
		</div>
	);
}
