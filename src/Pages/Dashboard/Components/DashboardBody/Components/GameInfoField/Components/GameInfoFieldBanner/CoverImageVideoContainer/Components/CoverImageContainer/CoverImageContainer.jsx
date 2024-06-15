import { useEffect, useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './CoverImageContainer.module.css';

function CoverImageContainer({
	setFocused,
	handleSetValues,
	name,
	setErrorShow,
	errorShow,
	type,
	number,
	inputRef,
	btnRef,
	mainValue,
}) {
	const [value, setValue] = useState(mainValue);
	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			handleSelect: e => {
				setFocused(false);
				if (e.target.files) {
					let select;
					if (e.target.files[0]) {
						const { name: fileName } = e.target.files[0] || {};
						select = { selected: true, name: fileName, file: e.target.files[0] };
					} else {
						select = { selected: false, name: 'name', file: null };
					}

					setValue(select);
					const { selected, name: selectName, file } = select;
					mainValue.selected = selected;
					mainValue.name = selectName;
					mainValue.file = file;

					const object = {
						type: 'FormData',
						file: e.target.files[0],
					};

					handleSetValues(object, name);
				}
			},

			handleCancel: () => {
				setFocused(false);
			},
		};
	}

	useEffect(() => {
		const input = inputRef.current;
		const { handleCancel } = eventRef.current;

		inputRef.current.addEventListener('cancel', handleCancel);

		return () => {
			input.removeEventListener('cancel', handleCancel);
		};
	}, [btnRef, inputRef]);

	return (
		<>
			<input
				accept="image/*"
				className={`${type.type === 'video' ? styles.field : styles.fileUploadField}`}
				id={`addGameBannerCover_${number}`}
				name={name}
				onChange={eventRef.current.handleSelect}
				ref={inputRef}
				type="file"
			/>
			<button
				className={styles.fileUploadButton}
				onClick={() => {
					inputRef.current.click();
					setFocused(true);
					if (errorShow) {
						setErrorShow(false);
					}
				}}
				ref={btnRef}
				type="button"
			>
				<p className={`${value.selected ? `${styles.selected} ` : ''}${styles.fileName}`}>
					{value.name}
				</p>

				<div className={styles.uploadImage}>
					<svg fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0_14_1859)">
							<path
								d="M8 46V47.5C8 48.6935 8.47411 49.8381 9.31802 50.682C10.1619 51.5259 11.3065 52 12.5 52H51.5C52.6935 52 53.8381 51.5259 54.682 50.682C55.5259 49.8381 56 48.6935 56 47.5V46"
								stroke="#000000"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="4"
							/>

							<path
								d="M31.999 13V40"
								stroke="#426AB2"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="4"
							/>

							<path
								d="M41 19L31.999 13L23 19"
								stroke="#426AB2"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="4"
							/>
						</g>

						<defs>
							<clipPath id="clip0_14_1859">
								<rect
									fill="white"
									height="42.999"
									transform="translate(6 11)"
									width="51.999"
								/>
							</clipPath>
						</defs>
					</svg>
				</div>

				<ButtonWaterEffect btnRef={btnRef} long />
			</button>
		</>
	);
}
export default CoverImageContainer;
