import { useEffect, useRef, useState } from 'react';
import useIsTouchAble from '../../../Utils/Hooks/useIsTouchable';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import ErrorMessage from '../../ErrorMessage/ErrorMessage/ErrorMessage';
import RippleEffect from '../../RippleEffect/RippleEffect';
import ImagePreviewContainer from '../ImagePreviewContainer/ImagePreviewContainer';
import styles from './FileUploadButton.module.css';

function FileUploadButton({
	placeholder,
	accept,
	className,
	setState,
	name,
	disabled,
	errorMessage,
	errorChange,
	htmlFor = '',
	defaultValue,
}) {
	const [selected, setSelected] = useState({
		selected: !!defaultValue,
		name: defaultValue
			? defaultValue instanceof File
				? defaultValue.name
				: defaultValue.substr(defaultValue.lastIndexOf('/') + 1)
			: 'name',
		file: defaultValue || null,
	});
	const [active, setActive] = useState(false);
	const [errorShow, setErrorShow] = useState(!!errorMessage);
	const [loading, setLoading] = useState(false);

	const containerRef = useRef(null);
	const inputRef = useRef(null);
	const btnRef = useRef(null);
	const previewBtnRef = useRef(null);

	const errorShowRef = useRef(errorShow);
	errorShowRef.current = errorShow;

	useEffect(() => {
		if (errorChange && errorMessage) {
			setErrorShow(true);
		} else {
			setErrorShow(false);
		}
	}, [errorChange, errorMessage]);

	const selectedRef = useRef(selected);
	selectedRef.current = selected;

	useEffect(() => {
		if (defaultValue && !selectedRef.current.selected) {
			setSelected({
				selected: true,
				name:
					defaultValue instanceof File
						? defaultValue.name
						: defaultValue.substr(defaultValue.lastIndexOf('/') + 1),
				file: defaultValue,
			});
		} else if (!defaultValue && selectedRef.current.selected) {
			setSelected({ selected: false, name: 'name' });
		}
		if (errorShowRef.current) {
			setErrorShow(false);
		}
	}, [defaultValue]);

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleCancel: () => {
				setActive(false);
			},
			handleSelect: e => {
				setActive(false);

				if (e.target.files) {
					if (e.target.files[0]) {
						const { name: fileName } = e.target.files[0] || {};

						const object = {
							type: 'FormData',
							file: e.target.files[0],
						};

						setState(object, name);
						setSelected({ selected: true, name: fileName, file: e.target.files[0] });
					}
				}
			},
		};
	}
	const isTouchAble = useIsTouchAble();
	const touchAble = isTouchAble();

	useScreenWidth();

	useEffect(() => {
		const input = inputRef.current;
		const { handleCancel } = eventRefs.current;

		input.addEventListener('cancel', handleCancel);

		return () => {
			input.removeEventListener('cancel', handleCancel);
		};
	}, []);

	return (
		<div
			className={`${className ? `${className} ` : ''}${
				disabled ? `${styles.containerDisabled} ` : ''
			}${styles.fileUploadContainer}`}
			ref={containerRef}
		>
			<div className={styles.fileUploadWithPreview}>
				<div className={styles.fileUpload}>
					<input
						{...(disabled && { disabled })}
						accept={accept}
						className={styles.fileUploadField}
						id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
						name={name}
						onChange={eventRefs.current.handleSelect}
						ref={inputRef}
						type='file'
					/>
					<button
						ref={btnRef}
						{...(disabled && { disabled })}
						className={`${errorShow ? `${styles.errorBorder} ` : ''}${
							styles.fileUploadButton
						}${loading ? ' loading' : ''}${active ? ` ${styles.activeBorder}` : ''}`}
						onClick={() => {
							inputRef.current.click();
							setActive(true);
							if (errorShow) {
								setErrorShow(false);
							}
						}}
						type='button'
					>
						<label
							className={`${active ? `${styles.active} ` : ''}${
								selected.selected ? `${styles.focused} ` : ''
							}${errorShow ? `${styles.errorColor} ` : ''}${styles.label}`}
							htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
							{...(active
								? { id: styles.active }
								: errorShow && { id: styles.errorColor })}
						>
							{placeholder || 'Browse'}
						</label>
						<p
							className={`${selected.selected ? `${styles.selected} ` : ''}${
								styles.fileName
							}`}
						>
							{selected.name}
						</p>
						{disabled || (
							<div className={styles.uploadImage}>
								<svg
									fill='none'
									viewBox='0 0 64 64'
									xmlns='http://www.w3.org/2000/svg'
								>
									<g>
										<path
											d='M8 46V47.5C8 48.6935 8.47411 49.8381 9.31802 50.682C10.1619 51.5259 11.3065 52 12.5 52H51.5C52.6935 52 53.8381 51.5259 54.682 50.682C55.5259 49.8381 56 48.6935 56 47.5V46'
											stroke='#000000'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='4'
										/>
										<path
											d='M31.999 13V40'
											stroke='#426AB2'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='4'
										/>
										<path
											d='M41 19L31.999 13L23 19'
											stroke='#426AB2'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='4'
										/>
									</g>
									<defs>
										<clipPath id='clip0_14_1859'>
											<rect
												fill='white'
												height='42.999'
												transform='translate(6 11)'
												width='51.999'
											/>
										</clipPath>
									</defs>
								</svg>
							</div>
						)}
						<RippleEffect long />
					</button>
					<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
				</div>
				{selected.file && touchAble ? (
					<button className={styles.previewBtn} ref={previewBtnRef} type='button'>
						Preview
						<RippleEffect long />
					</button>
				) : null}
			</div>
			{selected.file && /image|jpg|jpeg|png|gif/i.test(accept) ? (
				<ImagePreviewContainer
					btnRef={btnRef}
					containerRef={containerRef}
					file={selected.file}
					previewBtnRef={previewBtnRef}
					setLoading={setLoading}
					loading={loading}
					touchAble={touchAble}
				/>
			) : null}
		</div>
	);
}
export default FileUploadButton;
