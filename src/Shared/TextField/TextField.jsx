import { useEffect, useRef, useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
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
	parentErrorShow = true,
	...rest
}) {
	const [focused, setFocused] = useState(false);
	const [value, setValue] = useState(defaultValue);
	const [errorShow, setErrorShow] = useState(!!errorMessage);

	const fieldRef = useRef(null);
	const containerRef = useRef(null);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleInputEvent: () => {
				fieldRef.current.style.height = 'auto';
				fieldRef.current.style.height = `${fieldRef.current.scrollHeight}px`;
			},
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
				if (errorShow) setErrorShow(false);
				if (onFocusClick) {
					onFocusClick();
				}
				document.addEventListener('click', eventRefs.current.handleStop);
			},
			handleChange: e => {
				setValue(e.target.value);
				handleChange(e.target.value);
			},
			handleBlur: e => {
				setState(e.target.value, e.target.name);
				setFocused(false);
			},
		};
	}
	useEffect(() => {
		const holdFieldRef = fieldRef.current;
		if (field === 'textarea') {
			eventRefs.current();

			holdFieldRef.addEventListener('input', eventRefs.current);
		}

		return () => {
			if (field === 'textarea') {
				holdFieldRef.removeEventListener('input', eventRefs.current);
			}
		};
	}, [field]);

	useEffect(() => {
		if (errorChange && errorMessage) setErrorShow(true);
		else setErrorShow(false);
	}, [errorChange, errorMessage]);

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
					errorShow ? `${styles.error} ` : focused ? `${styles.focusBorder} ` : ''
				}${styles.container}`}
			>
				<label
					className={`${
						focused
							? `${styles.focused} `
							: value || defaultValue
							? `${styles.textFilled} `
							: ''
					}${styles.label}${field === 'textarea' ? ` ${styles.textareaLabel}` : ''}`}
					{...(errorShow && { id: styles.errorColor })}
					htmlFor={htmlFor}
				>
					{placeholder}
				</label>
				{field === 'input' ? (
					<input
						{...(enabled || { disabled: true, readOnly: true })}
						ref={fieldRef}
						onFocus={eventRefs.current.handleFocus}
						value={value}
						onChange={eventRefs.current.handleChange}
						onBlur={eventRefs.current.handleBlur}
						id={htmlFor}
						className={styles.field}
						autoComplete='off'
						{...rest}
					/>
				) : (
					<textarea
						ref={fieldRef}
						onFocus={eventRefs.current.handleFocus}
						value={value}
						onChange={eventRefs.current.handleChange}
						onBlur={eventRefs.current.handleBlur}
						id={htmlFor}
						className={`${styles.textarea} ${styles.field}`}
						rows={10}
						{...rest}
					/>
				)}
			</div>
			<ErrorMessage enable={errorShow} errorMessage={errorMessage} />
		</div>
	);
}
