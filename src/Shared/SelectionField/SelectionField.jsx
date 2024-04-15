import { useCallback, useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Hooks/useDropDownHide';
import useScreenWidth from '../../Hooks/useScreenWidth';
import ButtonWaterEffect from '../ButtonWaterEffect/ButtonWaterEffect';
import RotateArrow from '../RotateArrow/RotateArrow';
import ScrollBar from '../ScrollBar/ScrollBar';
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
    const [value, setValue] = useState(defaultValue);
    const [show, setShow] = useState(false);
    const [opacityShow, setOpacityShow] = useState(false);

    const screenWidth = useScreenWidth();

    const timeId = useRef(null);

    const valueRef = useRef(value);
    valueRef.current = value;
    const elementRef = useRef(null);
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const positionRef = useRef({ height: 0, bottom: true });
    const parentRef = useRef(null);
    const childRef = useRef(null);

    const handleIfTimeIdExist = useCallback(() => {
        if (timeId.current) {
            clearTimeout(timeId.current);
            timeId.current = null;
        }
    }, []);

    const handleHide = useCallback(() => {
        handleIfTimeIdExist();
        setOpacityShow(false);
        timeId.current = setTimeout(() => {
            setShow(false);
        }, 200);
    }, [handleIfTimeIdExist]);

    const { showMenu, setElement } = useDropDownHide(handleHide);

    useEffect(() => {
        if (parentSetValue) {
            setValue(parentSetValue);
        }
    }, [parentSetValue]);

    useEffect(() => {
        setElement(containerRef.current);
    }, [setElement]);

    useEffect(() => {
        if (inputRef.current)
            ctx.font = `${getComputedStyle(inputRef.current, null).fontSize} ${getComputedStyle(inputRef.current, null).fontFamily}`;
    }, [screenWidth]);

    const handleClick = () => {
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
    };

    return (
        <div ref={containerRef} className={styles.container}>
            <button
                type="button"
                {...(enabled || { tabIndex: '-1' })}
                {...(inputRef.current &&
                    ctx.measureText(value).width >
                        inputRef.current.offsetWidth -
                            parseFloat(getComputedStyle(inputRef.current, null).paddingLeft) -
                            parseFloat(getComputedStyle(inputRef.current, null).paddingRight) && { title: value })}
                ref={elementRef}
                className={`${errorBorder ? `${styles.errorBorder} ` : show ? `${styles.focusBorder} ` : ''}${className ? `${className} ` : ''}${styles.button}`}
                onClick={() => {
                    handleClick();
                    if (!show) {
                        showMenu(true);
                        setShow(true);
                        setOpacityShow(true);
                        handleIfTimeIdExist();
                    } else {
                        setOpacityShow(false);
                        handleIfTimeIdExist();
                        timeId.current = setTimeout(() => {
                            showMenu(false);
                            setShow(false);
                        }, 200);
                    }
                    if (onFocusClick) {
                        onFocusClick();
                    }
                }}
            >
                <label
                    className={`${show ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}`}
                    htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
                >
                    {placeholder}
                </label>
                <input
                    tabIndex="-1"
                    ref={inputRef}
                    value={value}
                    readOnly
                    id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
                    className={styles.field}
                    {...rest}
                />
                <div className={styles.rotateArrow}>
                    <RotateArrow state={show} />
                </div>
                <ButtonWaterEffect btnRef={elementRef} />
            </button>
            {show && (
                <ul
                    className={`${opacityShow ? '' : styles.hide} ${positionRef.current.bottom ? `${styles.showBottom} ` : `${styles.showAbove} `}${styles.listContainer}`}
                >
                    <div
                        ref={parentRef}
                        className={styles.listScrollContainer}
                        {...(positionRef.current.height && { style: { maxHeight: `${positionRef.current.height}px` } })}
                    >
                        <div ref={childRef}>
                            {none && (
                                <li className={styles.item} {...(value === '' && { id: styles.selected })}>
                                    <button
                                        tabIndex={show ? 0 : -1}
                                        type="button"
                                        onClick={() => {
                                            setShow(false);
                                            setValue('');
                                            setState('', name);
                                        }}
                                    >
                                        None
                                    </button>
                                </li>
                            )}
                            {list.map(item => (
                                <li className={styles.item} {...(value === item && { id: styles.selected })} key={item}>
                                    <button
                                        tabIndex={show ? 0 : -1}
                                        {...(value === item && { disabled: true })}
                                        type="button"
                                        onClick={() => {
                                            setShow(false);
                                            setValue(item);
                                            setState(item, name);
                                        }}
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                            {list.length === 0 && <li className={`${styles.item} ${styles.noDataItem}`}>No Data</li>}
                        </div>
                    </div>
                    <ScrollBar parentRef={parentRef} childRef={childRef} />
                </ul>
            )}
        </div>
    );
}
