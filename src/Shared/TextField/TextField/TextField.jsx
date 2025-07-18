import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../ErrorMessage/ErrorMessage/ErrorMessage';
import TextArea from '../TextArea/TextArea';
import styles from './TextField.module.css';

export default function TextField({
	field,
	className,
	placeholder,
	htmlFor = 0,
	setState,
	errorMessage = '',
	errorChange,
	handleChange = () => {},
	onFocusClick,
	enabled = true,
	defaultValue = '',
	pattern,
	parentErrorShow = true,
	...rest
}) {
	const [focused, setFocused] = useState(false);
	const [value, setValue] = useState(defaultValue);
	const [errorShow, setErrorShow] = useState(!!errorMessage);
	const fieldRef = useRef(null);
	const containerRef = useRef(null);
	const eventRefs = useRef(null);
	const errorShowRef = useRef(errorShow);
	errorShowRef.current = errorShow;

	const regexPattern = useRef(new RegExp(pattern));

	if (!eventRefs.current) {
		eventRefs.current = {
			handleStop: e => {
				if (containerRef.current) {
					if (!containerRef.current?.contains(e.target)) {
						fieldRef.current.blur();
						document.removeEventListener('click', eventRefs.current.handleStop);
					}
				} else {
					document.removeEventListener('click', eventRefs.current.handleStop);
				}
			},
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
				if (field === 'number') {
					if (!regexPattern.current.test(e.target.value)) {
						return;
					}
				}
				setValue(e.target.value);
				handleChange(e.target.value);
			},
			handleBlur: e => {
				setFocused(false);
				setState(e.target.value, e.target.name);
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

	const valueRef = useRef(value);
	valueRef.current = value;

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

	useEffect(() => {
		if (!parentErrorShow) {
			setErrorShow(false);
		}
	}, [parentErrorShow]);

	useEffect(() => {
		setErrorShow(prev => {
			if (prev) {
				return !prev;
			}
			return prev;
		});
	}, [placeholder]);

	return (
		<div
			className={`${className ? `${className} ` : ''}${styles.textFieldMainContainer}`}
			ref={containerRef}
		>
			<div
				className={`${
					errorShow
						? `${styles.error} `
						: focused
							? styles.focusBorder
							: styles.hoverBorder
				} ${styles.container}`}
			>
				<label
					className={`${focused || value ? `${styles.textShrink} ` : ''}${focused ? `${styles.focusedColor} ` : ''}${styles.label} ${field === 'textarea' ? styles.textareaLabel : styles.inputLabel}`}
					{...(errorShow && { id: styles.errorColor })}
					htmlFor={htmlFor}
				>
					{placeholder}
				</label>
				{field === 'input' || field === 'number' ? (
					<input
						{...(enabled || { disabled: true, readOnly: true })}
						autoComplete='off'
						className={`${styles.field}${field === 'input' ? '' : ` ${styles.fieldNumber}`}`}
						id={htmlFor}
						type='text'
						{...(field === 'number'
							? { inputMode: 'numeric', ...(pattern && { pattern }) }
							: {})}
						onBlur={eventRefs.current.handleBlur}
						onChange={eventRefs.current.handleChange}
						onFocus={eventRefs.current.handleFocus}
						ref={fieldRef}
						value={value}
						{...rest}
					/>
				) : (
					<TextArea
						className={`${styles.textarea} ${styles.field}`}
						id={htmlFor}
						onBlur={eventRefs.current.handleBlur}
						onChange={eventRefs.current.handleChange}
						onFocus={eventRefs.current.handleFocus}
						ref={fieldRef}
						rows={10}
						value={value}
						{...rest}
					/>
				)}
			</div>
			<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
		</div>
	);
}
