import { useEffect, useRef, useState } from 'react';
import useCalculateTextSize from '../../../Utils/Hooks/useCalculateTextSize';
import useDropDownHide from '../../../Utils/Hooks/useDropDownHide';
import useHoverTooltips from '../../../Utils/Hooks/useHoverTooltips';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import RippleEffect from '../../RippleEffect/RippleEffect';
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
		if (defaultValue && valueRef.current !== defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	const { widthInRem, remsInPixel } = useScreenWidth();

	const remWidthRefs = useRef({ widthInRem, remsInPixel });
	remWidthRefs.current = { widthInRem, remsInPixel };

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
				// Check if the dropdown should be at the bottom or top depending on the space available for 2 rows
				const oneRow = 2.5 * remWidthRefs.current.remsInPixel;

				if (bottomRemain >= oneRow * 2 || y < oneRow * 2) {
					positionRef.current.bottom = true;
				} else {
					positionRef.current.bottom = false;
				}
				// get the height of the dropdown depending on the number of items in the dropdown
				if ((none ? list.length + 1 : list.length) > 8) {
					positionRef.current.height = Math.min(
						parseInt((positionRef.current.bottom ? bottomRemain : y) / oneRow, 10) *
							oneRow,
						oneRow * 8
					);
				} else {
					positionRef.current.height =
						(none ? list.length + 1 : list.length || 1) * oneRow;
				}
			},
		};
	}

	useHoverTooltips(
		elementRef,
		value,
		() => containerRef.current && width + 45 > containerRef.current.clientWidth,
		'left'
	);

	useEffect(() => {
		const input = inputRef.current;

		if (input) {
			// Set the width of the input field depending on the text
			setWidth(calculateTextWidth(defaultValue, '16px Inter'));
		}
	}, [calculateTextWidth, defaultValue, placeholder]);

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
					setShow(prev => {
						if (!prev) {
							eventRefs.current.handleClick();
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
				<RippleEffect />
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
					setWidth(calculateTextWidth(val, '1rem Inter'));
				}}
				state={show}
				value={value}
			/>
		</div>
	);
}
