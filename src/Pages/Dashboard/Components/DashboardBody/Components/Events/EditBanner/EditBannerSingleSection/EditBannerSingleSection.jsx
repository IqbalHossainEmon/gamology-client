import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import FileUploadButton from '../../../../../../../../Shared/FileUploadButton/FileUploadButton/FileUploadButton';
import TypeableSelectionField from '../../../../../../../../Shared/TypeableSelectionField/TypeableSelectionField';
import styles from './EditBannerSingleSection.module.css';

function EditBannerSingleSection({ index, item, bannerData, errorMessages, errorChange }) {
	const [defaultData, setDefaultData] = useState(item);

	const resetBtnRef = useRef(null);
	const clearBtnRef = useRef(null);

	return (
		<div>
			<div className={styles.headerContainer}>
				<h3 className={`${styles.marginTop} ${styles.subHeader}`}>
					Upload Image #{index + 1}
				</h3>
				<div className={styles.headerBtn}>
					<button
						ref={resetBtnRef}
						className={styles.resetBtn}
						type='button'
						onClick={() => {
							setDefaultData(item);
							bannerData.current[index] = item;
						}}
					>
						Reset
						<ButtonWaterEffect btnRef={resetBtnRef} />
					</button>
					<button
						ref={clearBtnRef}
						className={styles.clearBtn}
						type='button'
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
						<ButtonWaterEffect btnRef={clearBtnRef} />
					</button>
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
				name='name'
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
