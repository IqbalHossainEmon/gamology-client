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
    const [type, setType] = useState(hasDefault && defaultGameBanner?.type ? defaultGameBanner.type : '');

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
                type={type}
                handleSetValues={handleSetValues}
                errorChange={errorChange}
                name="cover"
                errorMessage={errorMessages[number]?.cover}
                number={number}
                {...(hasDefault && { defaultData: defaultGameBanner?.cover })}
                hasDefault={hasDefault}
            />
            <FileUploadButton
                {...(type || { disabled: true })}
                field="input"
                accept="image/*"
                htmlFor={`coverThumb${number}`}
                setState={handleSetValues}
                placeholder={type.type ? `Choose Game's Banner ${type.type}'s thumbnail` : 'Select Content Type First'}
                name="thumb"
                defaultValue=""
                errorChange={errorChange}
                errorMessage={errorMessages[number]?.thumb}
                {...(hasDefault && { defaultValue: defaultGameBanner?.thumb })}
            />

            <div className={styles.selectContainer}>
                <SelectionField
                    setState={(value, name) => {
                        setType(value);
                        handleSetValues(value, name);
                    }}
                    list={['image', 'video']}
                    htmlFor={number}
                    placeholder="Content Type"
                    name="type"
                    {...(hasDefault && { defaultValue: defaultGameBanner?.type })}
                />
            </div>
        </div>
    );
}
