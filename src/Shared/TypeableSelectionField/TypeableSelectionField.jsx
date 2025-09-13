import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Utils/Hooks/useDropDownHide';
import ErrorMessage from '../ErrorMessage/ErrorMessage/ErrorMessage';
import SuggestionList from '../SuggestionList/SuggestionList/SuggestionList';
import styles from './TypeableSelectionField.module.css';

export default function TypeableSelectionField({
	placeholder = 'Type',
	className,
	htmlFor,
	name,
	defaultValue = '',
	propertyName = '',
	link = '',
	onFocusClick,
	enabled = true,
	setState = () => {},
	handleChange = () => {},
	errorMessage,
	errorChange,
	setHeight,
	checkLinkStarValue = () => false,
	specialSetValueHandler,
	handleValueCheck,
	blurSet,
}) {
	const [value, setValue] = useState(defaultValue);
	const [show, setShow] = useState(false);
	const [focused, setFocused] = useState(false);
	const [errorShow, setErrorShow] = useState(!!errorMessage);

	const valueRef = useRef(value);
	valueRef.current = value;
	const elementRef = useRef(null);
	const containerRef = useRef(null);
	const fieldRef = useRef(null);

	const errorShowRef = useRef(errorShow);
	errorShowRef.current = errorShow;

	const isShownRef = useRef(show);
	isShownRef.current = show;

	const { showMenu, setElement, onHide } = useDropDownHide(setShow);

	useEffect(() => {
		setElement(containerRef.current);
	}, [setElement]);

	const eventRefs = useRef(null);

	const didErrorShowed = useRef(false);

	useEffect(() => {
		if (defaultValue && !valueRef.current) {
			setValue(defaultValue);
		} else if (!defaultValue && valueRef.current) {
			setValue('');
		}
		if (errorShowRef.current) {
			setErrorShow(false);
			if (setHeight && didErrorShowed.current) {
				setHeight(prev => prev - 1.849375);
				didErrorShowed.current = false;
			}
		}
	}, [defaultValue, setHeight]);

	if (!eventRefs.current) {
		let isAdded = true;
		eventRefs.current = {
			handleFocus: () => {
				setFocused(true);
				document.addEventListener('keydown', eventRefs.current.onSpecialKey);
				isAdded = true;
				if (errorShowRef.current) {
					setErrorShow(false);
					if (setHeight && didErrorShowed.current) {
						setHeight(prev => prev - 1.849375);
						didErrorShowed.current = false;
					}
				}
				if (onFocusClick) {
					onFocusClick();
				}
			},
			handleChange: e => {
				setValue(e.target.value);
				handleChange(e.target.value);
				if (!isShownRef.current && e.target.value) {
					showMenu();
					setShow(true);
				}
				if (isShownRef.current && !e.target.value) {
					onHide();
					setShow(false);
				}
			},
			handleBlur: e => {
				setFocused(false);
				if (isAdded) {
					document.removeEventListener('keydown', eventRefs.current.onSpecialKey);
				}
				if (blurSet && checkLinkStarValue(valueRef.current)) {
					setState(e.target.value, true, propertyName);
				}
			},
			getSuggestionValue: val => {
				if (typeof val === 'string') {
					return handleValueCheck ? handleValueCheck(val) : val;
				}
				if (val && typeof val === 'object' && 'name' in val) {
					return handleValueCheck ? handleValueCheck(val.name) : val.name;
				}
				return '';
			},
			onSpecialKey: e => {
				switch (e.key) {
					case 'Enter':
						// Handle enter key
						document.removeEventListener('keydown', eventRefs.current.onSpecialKey);
						isAdded = false;
						break;
					case 'Escape':
						if (isShownRef.current) {
							onHide();
							setShow(false);
						}
						isAdded = false;
						document.removeEventListener('keydown', eventRefs.current.onSpecialKey);
						break;
					case 'Tab':
						// see the focused element
						setTimeout(() => {
							setShow(containerRef.current.contains(document.activeElement));
							document.removeEventListener('keydown', eventRefs.current.onSpecialKey);
							isAdded = false;
						}, 0);
						break;
					default:
						break;
				}
			},
		};
	}

	useEffect(() => {
		if (errorChange && errorMessage) {
			setErrorShow(true);
			if (setHeight) {
				setHeight(prev => prev + 1.849375);
				didErrorShowed.current = true;
			}
		} else {
			setErrorShow(false);

			if (setHeight && didErrorShowed.current) {
				setHeight(prev => prev - 1.849375);
				didErrorShowed.current = false;
			}
		}
	}, [errorChange, errorMessage, setHeight]);

	return (
		<div
			className={`${styles.container}${className ? ` ${className}` : ''}`}
			ref={containerRef}
		>
			<div
				className={`${errorShow ? `${styles.errorBorder} ` : focused ? styles.focusBorder : styles.hoverBorder} ${styles.innerContainer}`}
				ref={elementRef}
			>
				<label
					className={`${focused || value ? `${styles.textShrink} ` : ''}${focused ? `${styles.focusedColor} ` : ''}${styles.label}`}
					{...(errorShow && { id: styles.errorColor })}
					htmlFor={htmlFor}
				>
					{placeholder}
				</label>
				<input
					{...(enabled || { disabled: true, readOnly: true })}
					autoComplete='off'
					className={styles.field}
					id={htmlFor}
					type='input'
					name={name}
					onChange={eventRefs.current.handleChange}
					onFocus={eventRefs.current.handleFocus}
					onBlur={eventRefs.current.handleBlur}
					ref={fieldRef}
					value={value.name || value}
				/>
			</div>
			<SuggestionList
				setShow={setShow}
				setState={val => {
					setValue(
						specialSetValueHandler
							? specialSetValueHandler(propertyName ? val[propertyName] : val)
							: propertyName
								? val[propertyName]
								: val
					);
					setState(val);
				}}
				prototypeName='name'
				searchInputRef={fieldRef}
				value={eventRefs.current.getSuggestionValue(value)}
				searchRef={elementRef}
				setHeight={setHeight}
				link={link}
				parentShow={
					!checkLinkStarValue(typeof value === 'string' ? value : value.name) && show
				}
			/>
			<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
		</div>
	);
}
