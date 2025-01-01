import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Utils/Hooks/useDropDownHide';
import ErrorMessage from '../ErrorMessage/ErrorMessage/ErrorMessage';
import SuggestionList from '../FieldSuggestionList/SuggestionList/SuggestionList';
import styles from './TypeableSelectionField.module.css';

export default function TypeableSelectionField({
	placeholder = 'Type',
	className,
	htmlFor,
	defaultValue = '',
	name = '',
	onFocusClick,
	enabled = true,
	setState = () => {},
	handleChange = () => {},
	errorMessage,
	errorChange = () => {},
	...rest
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

	useEffect(() => {
		if (defaultValue && !valueRef.current) {
			setValue(defaultValue);
		} else if (!defaultValue && valueRef.current) {
			setValue('');
		}
		if (errorShowRef.current) {
			setErrorShow(false);
		}
	}, [defaultValue]);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleFocus: () => {
				setFocused(true);
				if (errorShowRef.current) {
					setErrorShow(false);
				}
				if (onFocusClick) {
					onFocusClick();
				}
				document.addEventListener('click', eventRefs.current.handleStop);
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
			handleBlur: () => {
				setFocused(false);
			},
		};
	}
	useEffect(() => {
		if (errorChange && errorMessage) {
			setErrorShow(true);
		} else {
			setErrorShow(false);
		}
	}, [errorChange, errorMessage]);

	return (
		<div
			className={`${styles.container}${className ? ` ${className}` : ''}`}
			ref={containerRef}
		>
			<div
				className={`${errorShow ? `${styles.errorBorder} ` : focused ? `${styles.focusBorder} ` : ''}${styles.innerContainer}`}
				ref={elementRef}
			>
				<label
					className={`${focused ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}`}
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
					onChange={eventRefs.current.handleChange}
					onFocus={eventRefs.current.handleFocus}
					onBlur={eventRefs.current.handleBlur}
					ref={fieldRef}
					value={typeof value === 'string' ? value : value.name}
					{...rest}
				/>
			</div>
			<SuggestionList
				name={name}
				setShow={setShow}
				setState={setState}
				setValue={val => {
					setValue(val);
				}}
				searchInputRef={fieldRef}
				value={typeof value === 'string' ? value : value.name}
				searchRef={elementRef}
				link='http://localhost:5173/api/autocomplete'
			/>
			<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
		</div>
	);
}
