import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../Hooks/useDropDownHide';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import ButtonWaterEffect from '../../ButtonWaterEffect/ButtonWaterEffect';
import RotateArrow from '../../RotateArrow/RotateArrow';
import SelectionFieldList from '../SelectionFieldList/SelectionFieldList';
import styles from './SelectionField.module.css';

const span = document.createElement('span');

export default function SelectionField({
	placeholder = 'Type',
	className,
	htmlFor,
	setState,
	list = [],
	defaultValue = '',
	name = '',
	onFocusClick,
	enabled = true,
	parentSetValue = '',
	errorBorder = false,
	none,
	...rest
}) {
	const [value, setValue] = useState(defaultValue);
	const [show, setShow] = useState(false);
	const [width, setWidth] = useState(0);

	const screenWidth = useScreenWidth();
	const valueRef = useRef(value);
	valueRef.current = value;
	const parentSetValueRef = useRef(parentSetValue);
	parentSetValueRef.current = parentSetValue;
	const elementRef = useRef(null);
	const containerRef = useRef(null);
	const inputRef = useRef(null);
	const positionRef = useRef({ height: 0, bottom: true });
	const parentRef = useRef(null);
	const childRef = useRef(null);
	const { showMenu, setElement, stopMenu } = useDropDownHide(setShow);

	useEffect(() => {
		if (parentSetValueRef.current) {
			setValue(parentSetValueRef.current);
		}
	}, []);

	useEffect(() => {
		setElement(containerRef.current);
	}, [setElement]);

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleClick: () => {
				const { height, y } = elementRef.current.getBoundingClientRect();
				const bottomRemain = window.innerHeight - y - height;
				if (list.length > 4) {
					if (bottomRemain < 170) {
						positionRef.current.bottom = false;
						if (y < 420) {
							positionRef.current.height = y;
						} else {
							positionRef.current.height = 0;
						}
					} else {
						positionRef.current.bottom = true;
						if (bottomRemain < 420) {
							positionRef.current.height = bottomRemain;
						} else {
							positionRef.current.height = 0;
						}
					}
				} else if (bottomRemain < list.length * 40 + 10) {
					positionRef.current.bottom = false;
				} else {
					positionRef.current.bottom = true;
				}
			},
			calculateWidth: value => {
				document.body.appendChild(span);
				span.textContent = value;
				setWidth(span.offsetWidth);
				document.body.removeChild(span);
			},
		};
	}
	useEffect(() => {
		const input = inputRef.current;
		if (input) {
			span.style.font = window.getComputedStyle(input).font;
			eventRefs.current.calculateWidth(defaultValue);
		}
	}, [defaultValue, screenWidth]);

	return (
		<div className={styles.container} ref={containerRef}>
			<button
				type="button"
				{...(enabled || { tabIndex: '-1' })}
				{...(inputRef.current &&
					width >
						inputRef.current.offsetWidth -
							parseFloat(getComputedStyle(inputRef.current, null).paddingLeft) -
							parseFloat(getComputedStyle(inputRef.current, null).paddingRight) && {
						title: value,
					})}
				className={`${errorBorder ? `${styles.errorBorder} ` : show ? `${styles.focusBorder} ` : ''}${className ? `${className} ` : ''}${styles.button}`}
				onClick={() => {
					eventRefs.current.handleClick();
					setShow(prev => {
						if (!prev) {
							showMenu();
						} else {
							stopMenu();
						}
						return !prev;
					});
					if (onFocusClick) {
						onFocusClick();
					}
				}}
				ref={elementRef}
			>
				<label
					className={`${show ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}`}
					htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
				>
					{placeholder}
				</label>
				<input
					className={styles.field}
					id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
					readOnly
					ref={inputRef}
					tabIndex="-1"
					value={value}
					{...rest}
				/>
				<div className={styles.rotateArrow}>
					<RotateArrow state={show} />
				</div>
				<ButtonWaterEffect btnRef={elementRef} />
			</button>
			<SelectionFieldList
				childRef={childRef}
				list={list}
				name={name}
				none={none}
				parentRef={parentRef}
				positionRef={positionRef}
				setShow={setShow}
				setState={setState}
				setValue={value => {
					setValue(value);
					eventRefs.current.calculateWidth(value);
				}}
				state={show}
				value={value}
			/>
		</div>
	);
}
