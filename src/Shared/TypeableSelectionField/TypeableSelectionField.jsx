import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Utils/Hooks/useDropDownHide';
import ErrorMessage from '../ErrorMessage/ErrorMessage/ErrorMessage';
import SuggestionList from '../SuggestionList/SuggestionList/SuggestionList';
import styles from './TypeableSelectionField.module.css';

export default function TypeableSelectionField({
	placeholder = 'Type',
	className,
	htmlFor,
	list = [],
	defaultValue = '',
	name = '',
	onFocusClick,
	enabled = true,
	errorBorder = false,
	setState = () => {},
	handleChange = () => {},
	errorMessage,
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
	const positionRef = useRef({ height: 0, bottom: true });
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
			handleBlur: e => {
				setState(e.target.value, e.target.name);
				setFocused(false);
			},
		};
	}

	return (
		<div
			className={`${styles.container}${className ? ` ${className}` : ''}`}
			ref={containerRef}
		>
			<div
				className={`${errorBorder ? `${styles.errorBorder} ` : focused ? `${styles.focusBorder} ` : ''}${styles.innerContainer}`}
				ref={elementRef}
			>
				<label
					className={`${focused ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}`}
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
					onBlur={eventRefs.current.handleBlur}
					onChange={eventRefs.current.handleChange}
					onFocus={eventRefs.current.handleFocus}
					ref={fieldRef}
					value={value}
					{...rest}
				/>
			</div>
			<SuggestionList
				list={list}
				name={name}
				positionRef={positionRef}
				setShow={setShow}
				setState={setState}
				setValue={val => {
					setValue(val);
				}}
				state={show}
				value={value}
				elementRef={elementRef}
			/>
			<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
		</div>
	);
}
