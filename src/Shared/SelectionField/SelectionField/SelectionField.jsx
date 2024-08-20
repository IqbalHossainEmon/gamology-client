import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../Hooks/useDropDownHide';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import ButtonWaterEffect from '../../ButtonWaterEffect/ButtonWaterEffect';
import RotateArrow from '../../RotateArrow/RotateArrow';
import SelectionFieldList from '../SelectionFieldList/SelectionFieldList';
import styles from './SelectionField.module.css';

const ctx = document.createElement('canvas').getContext('2d');

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
    const [value, setValue] = useState(defaultValue),
     [show, setShow] = useState(false),

     screenWidth = useScreenWidth(),

     valueRef = useRef(value);
    valueRef.current = value;
    const parentSetValueRef = useRef(parentSetValue);
    parentSetValueRef.current = parentSetValue;
    const elementRef = useRef(null),
     containerRef = useRef(null),
     inputRef = useRef(null),
     positionRef = useRef({ height: 0, bottom: true }),
     parentRef = useRef(null),
     childRef = useRef(null),

     { showMenu, setElement, stopMenu } = useDropDownHide(setShow);

    useEffect(() => {
        if (parentSetValueRef.current) {
            setValue(parentSetValueRef.current);
        }
    }, []);

    useEffect(() => {
        setElement(containerRef.current);
    }, [setElement]);

    useEffect(() => {
        if (inputRef.current)
            {ctx.font = `${getComputedStyle(inputRef.current, null).fontSize} ${getComputedStyle(inputRef.current, null).fontFamily}`;}
    }, [screenWidth]);

    const handleClick = () => {
        const { height, y } = elementRef.current.getBoundingClientRect(),

         bottomRemain = window.innerHeight - y - height;
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
    };

    return (
        <div
            className={styles.container}
            ref={containerRef}
        >
            <button
                type="button"
                {...(enabled || { tabIndex: '-1' })}
                {...(inputRef.current &&
                    ctx.measureText(value).width >
                        inputRef.current.offsetWidth -
                            parseFloat(getComputedStyle(inputRef.current, null).paddingLeft) -
                            parseFloat(getComputedStyle(inputRef.current, null).paddingRight) && { title: value })}
                className={`${errorBorder ? `${styles.errorBorder} ` : show ? `${styles.focusBorder} ` : ''}${className ? `${className} ` : ''}${styles.button}`}
                onClick={() => {
                    handleClick();
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
                setValue={setValue}
                state={show}
                value={value}
            />
        </div>
    );
}
