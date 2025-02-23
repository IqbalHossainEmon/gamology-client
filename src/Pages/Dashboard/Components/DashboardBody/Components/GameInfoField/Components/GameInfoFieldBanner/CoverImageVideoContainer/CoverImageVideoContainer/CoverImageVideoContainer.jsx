import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage/ErrorMessage';
import ImagePreviewContainer from '../../../../../../../../../../Shared/FileUploadButton/ImagePreviewContainer/ImagePreviewContainer';
import RippleEffect from '../../../../../../../../../../Shared/RippleEffect/RippleEffect';
import useIsTouchAble from '../../../../../../../../../../Utils/Hooks/useIsTouchable';
import useScreenWidth from '../../../../../../../../../../Utils/Hooks/useScreenWidth';
import CoverImageContainer from '../Components/CoverImageContainer/CoverImageContainer';
import CoverVideoContainer from '../Components/CoverVideoContainer/CoverVideoContainer';
import styles from './CoverImageVideoContainer.module.css';

function CoverImageVideoContainer({
	type,
	handleSetValues,
	errorMessage,
	errorChange,
	name,
	number,
	hasDefault,
	defaultData,
}) {
	const [errorShow, setErrorShow] = useState(Boolean(errorMessage));
	const [focused, setFocused] = useState(false);
	const [loading, setLoading] = useState(false);

	const mainValueRef = useRef({
		image:
			type === 'image'
				? {
						selected: hasDefault,
						name: defaultData
							? defaultData instanceof File
								? defaultData.name
								: defaultData.substr(defaultData.lastIndexOf('/') + 1)
							: '',
						file: defaultData,
					}
				: { selected: false, name: 'name', file: null },
		video: type === 'video' ? defaultData : '',
	});
	const inputRef = useRef(null);
	const containerRef = useRef(null);
	const previewBtnRef = useRef(null);
	const btnRef = useRef(null);

	const isTouchAble = useIsTouchAble();
	const touchAble = isTouchAble();

	useScreenWidth();

	useEffect(() => {
		if (errorChange && errorMessage) {
			setErrorShow(true);
		} else {
			setErrorShow(false);
		}
	}, [errorChange, errorMessage]);

	return (
		<div
			className={`${styles.outerContainer}${type ? '' : ` ${styles.disabled}`}`}
			ref={containerRef}
		>
			<div className={styles.containerWithPreview}>
				<div
					className={`${
						errorShow ? `${styles.error} ` : focused ? `${styles.focusBorder} ` : ''
					}${styles.container}${loading ? ` ${styles.loading}` : ''}${type ? '' : ` ${styles.padding} `}`}
				>
					{type ? (
						<label
							className={`${
								errorShow
									? `${styles.errorColor} ${mainValueRef.current.image ? styles.textFilled : ''} `
									: focused
										? `${styles.focused} `
										: (type === 'image' &&
													mainValueRef.current.image.selected) ||
											  (type === 'video' && mainValueRef.current.video)
											? `${styles.textFilled} `
											: ''
							}${styles.label}`}
							htmlFor={`addGameBannerCover_${number}`}
						>
							{`Choose Game's Banner's ${type}`}
						</label>
					) : null}

					{type ? (
						type === 'video' ? (
							<CoverVideoContainer
								errorShow={errorShow}
								inputRef={inputRef}
								mainValue={mainValueRef.current.video}
								mainValueRef={mainValueRef}
								name={name}
								number={number}
								onBlur={e => {
									handleSetValues(e.target.value, e.target.name);
									setFocused(false);
									mainValueRef.current.video = e.target.value;
								}}
								onFocus={() => {
									setFocused(true);
									if (errorShow) {
										setErrorShow(false);
									}
								}}
								setErrorShow={setErrorShow}
							/>
						) : (
							<CoverImageContainer
								btnRef={btnRef}
								containerRef={containerRef}
								errorShow={errorShow}
								handleSetValues={handleSetValues}
								inputRef={inputRef}
								mainValue={mainValueRef.current.image}
								name={name}
								number={number}
								setErrorShow={setErrorShow}
								setFocused={setFocused}
								type={type}
							/>
						)
					) : (
						<p
							className={`${errorShow ? `${styles.errorColor} ` : ''}${
								styles.defaultText
							}`}
						>
							Select Content Type First
						</p>
					)}
				</div>

				{mainValueRef.current?.image.file && touchAble ? (
					<button className={styles.previewBtn} ref={previewBtnRef} type='button'>
						Preview
						<RippleEffect long />
					</button>
				) : null}
			</div>

			{type === 'image' && mainValueRef.current?.image.file ? (
				<ImagePreviewContainer
					setLoading={setLoading}
					loading={loading}
					btnRef={btnRef}
					containerRef={containerRef}
					file={mainValueRef.current?.image.file}
					previewBtnRef={previewBtnRef}
					touchAble={touchAble}
				/>
			) : null}
			<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
		</div>
	);
}
export default CoverImageVideoContainer;
