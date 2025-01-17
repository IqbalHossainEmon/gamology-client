import { useEffect, useRef, useState } from 'react';
import useCalculateTextSize from '../../../Utils/Hooks/useCalculateTextSize';
import useDropDownHide from '../../../Utils/Hooks/useDropDownHide';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import useTooltip from '../../../Utils/Hooks/useTooltip';
import ButtonWaterEffect from '../../ButtonWaterEffect/ButtonWaterEffect';
import RotateArrow from '../../RotateArrow/RotateArrow';
import SelectionFieldList from '../SelectionFieldList/SelectionFieldList';
import styles from './SelectionField.module.css';

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
	errorBorder = false,
	none,
	...rest
}) {
	const [value, setValue] = useState(defaultValue);
	const [show, setShow] = useState(false);
	const [width, setWidth] = useState(0);

	const valueRef = useRef(value);
	valueRef.current = value;
	const elementRef = useRef(null);
	const containerRef = useRef(null);
	const inputRef = useRef(null);
	const positionRef = useRef({ height: 0, bottom: true });

	useEffect(() => {
		if (valueRef.current !== defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	const { widthInRem } = useScreenWidth();

	const { showMenu, setElement, onHide } = useDropDownHide(setShow);
	const calculateTextWidth = useCalculateTextSize();

	useEffect(() => {
		setElement(containerRef.current);
	}, [setElement]);

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			// Check the position of the dropdown and set the height of the dropdown
			handleClick: () => {
				const { height: eleHeight, y } = elementRef.current.getBoundingClientRect();
				const bottomRemain = window.innerHeight - y - eleHeight;
				// Check if the dropdown should be at the bottom or top depending on the space available for 2 rows (each row is 40px)
				if (bottomRemain >= 80 || y < 80) {
					positionRef.current.bottom = true;
				} else {
					positionRef.current.bottom = false;
				}
				// get the height of the dropdown depending on the number of items in the dropdown
				if (none ? list.length + 1 : list.length > 8) {
					positionRef.current.height = Math.min(
						parseInt((positionRef.current.bottom ? bottomRemain : y) / 40, 10) * 40,
						320
					);
				} else {
					positionRef.current.height = (none ? list.length + 1 : list.length || 1) * 40;
				}
			},
		};
	}

	const setTooltip = useTooltip();

	const isAdded = useRef(false);

	useEffect(() => {
		// Check if the text is overflowing the container and add tooltip
		if (containerRef.current && width + 45 > containerRef.current.clientWidth) {
			setTooltip(elementRef.current, value);
			isAdded.current = true;
		} else if (isAdded.current) {
			isAdded.current = false;
			setTooltip(elementRef.current, null);
		}
	}, [setTooltip, value, width, screenWidth]);

	useEffect(() => {
		const input = inputRef.current;

		if (input) {
			// Set the width of the input field depending on the text
			setWidth(calculateTextWidth(defaultValue, '16px Inter'));
		}
	}, [calculateTextWidth, defaultValue, placeholder, setTooltip]);

	return (
		<div
			className={`${styles.container}${className ? ` ${className}` : ''}`}
			ref={containerRef}
		>
			<button
				type='button'
				{...(enabled || { tabIndex: '-1' })}
				className={`${errorBorder ? `${styles.errorBorder} ` : show ? `${styles.focusBorder} ` : ''}${styles.button}`}
				onClick={() => {
					eventRefs.current.handleClick();
					setShow(prev => {
						if (!prev) {
							showMenu();
						} else {
							onHide();
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
					tabIndex='-1'
					value={value}
					{...rest}
				/>
				<div className={styles.rotateArrow}>
					<RotateArrow state={show} />
				</div>
				<ButtonWaterEffect btnRef={elementRef} />
			</button>
			<SelectionFieldList
				list={list}
				name={name}
				none={none}
				positionRef={positionRef}
				setShow={setShow}
				setState={setState}
				setValue={val => {
					setValue(val);
					setWidth(calculateTextWidth(val, '16px Inter'));
				}}
				state={show}
				value={value}
			/>
		</div>
	);
}
