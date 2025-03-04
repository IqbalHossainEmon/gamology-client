import { useRef, useState } from 'react';
import FileUploadButton from '../../../../../../../../Shared/FileUploadButton/FileUploadButton/FileUploadButton';
import TypeableSelectionField from '../../../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import useObjectUtilities from '../../../../../../../../Utils/Hooks/useObjectUtilities';
import ButtonWithRipple from '../../../../Shared/ButtonWithRipple/ButtonWithRipple';
import styles from './EditBannerSingleSection.module.css';

function EditBannerSingleSection({ index, item, bannerData, errorMessages, errorChange }) {
	const [defaultData, setDefaultData] = useState(item);

	const { cloneObject } = useObjectUtilities();

	const initialData = useRef(cloneObject(item));

	return (
		<div>
			<div className={styles.headerContainer}>
				<h3 className={`${styles.marginTop} ${styles.subHeader}`}>
					Upload Image #{index + 1}
				</h3>
				<div className={styles.headerBtnContainer}>
					<ButtonWithRipple
						className={styles.btn}
						onClick={() => {
							setDefaultData({
								coverImg: '',
								coverMobile: '',
								carouselThumb: '',
								logoImg: '',
								name: '',
							});
							setTimeout(() => {
								setDefaultData(initialData.current);
							}, 0);
							bannerData.current[index] = item;
						}}
					>
						Reset
					</ButtonWithRipple>
					<ButtonWithRipple
						className={styles.btn}
						onClick={() => {
							setDefaultData({
								coverImg: '',
								coverMobile: '',
								carouselThumb: '',
								logoImg: '',
								name: '',
							});
							bannerData.current[index] = {
								coverImg: '',
								coverMobile: '',
								carouselThumb: '',
								logoImg: '',
								name: '',
							};
						}}
					>
						Clear
					</ButtonWithRipple>
				</div>
			</div>
			<FileUploadButton
				className={styles.marginTop}
				placeholder={`Upload The banner Cover #${index + 1}`}
				name='coverImg'
				htmlFor={`cover#${index}`}
				defaultValue={defaultData.coverImg}
				accept={'image/*'}
				setState={(object, name) => {
					bannerData.current[index][name] = object;
				}}
				errorChange={errorChange}
				errorMessage={errorMessages.current[index].coverImg}
			/>
			<FileUploadButton
				className={styles.marginTop}
				placeholder={`Upload The banner Cover Mobile #${index + 1}`}
				name='coverMobile'
				htmlFor={`coverMobile#${index}`}
				defaultValue={defaultData.coverMobile}
				accept={'image/*'}
				setState={(object, name) => {
					bannerData.current[index][name] = object;
				}}
				errorChange={errorChange}
				errorMessage={errorMessages.current[index].coverMobile}
			/>
			<FileUploadButton
				className={styles.marginTop}
				placeholder={`Upload The banner Carousel Thumb #${index + 1}`}
				name='carouselThumb'
				htmlFor={`carouselThumb#${index}`}
				defaultValue={defaultData.carouselThumb}
				accept={'image/*'}
				setState={(object, name) => {
					bannerData.current[index][name] = object;
				}}
				errorChange={errorChange}
				errorMessage={errorMessages.current[index].carouselThumb}
			/>
			<FileUploadButton
				className={styles.marginTop}
				placeholder={`Upload The banner Logo #${index + 1}`}
				name='logoImg'
				htmlFor={`logo#${index}`}
				defaultValue={defaultData.logoImg}
				accept={'image/*'}
				setState={(object, name) => {
					bannerData.current[index][name] = object;
				}}
				errorChange={errorChange}
				errorMessage={errorMessages.current[index].logoImg}
			/>
			<TypeableSelectionField
				className={styles.marginTop}
				propertyName='name'
				placeholder='Enter the game name'
				htmlFor={`gameName#${index}`}
				defaultValue={defaultData.name}
				setState={(object, name) => {
					bannerData.current[index][name] = object.name;
				}}
				errorChange={errorChange}
				errorMessage={errorMessages.current[index].name}
			/>
		</div>
	);
}
export default EditBannerSingleSection;
