import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Hooks/useDropDownHide';
import useScreenWidth from '../../Hooks/useScreenWidth';
import ButtonWaterEffect from '../ButtonWaterEffect/ButtonWaterEffect';
import RotateArrow from '../RotateArrow/RotateArrow';
import styles from './SelectionField.module.css';

const ctx = document.createElement('canvas').getContext('2d');

export default function SelectionField({
  placeholder = 'Type',
  className,
  htmlFor,
  setState,
  list = [],
  name = '',
  onFocusClick,
  enabled = true,
  ...rest
}) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const screenWidth = useScreenWidth();

  const elementRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const { showMenu, setElement } = useDropDownHide(setShow);

  useEffect(() => {
    setElement(containerRef.current);
  }, [setElement]);

  useEffect(() => {
    if (inputRef.current)
      ctx.font = `${getComputedStyle(inputRef.current, null).fontSize} ${getComputedStyle(inputRef.current, null).fontFamily}`;
  }, [screenWidth]);

  return (
    <div ref={containerRef} className={`${show ? '' : `${styles.overflow} `}${styles.container}`}>
      <button
        type="button"
        {...(enabled || { tabIndex: '-1' })}
        {...(inputRef.current &&
          ctx.measureText(value).width >
            inputRef.current.offsetWidth -
              parseFloat(getComputedStyle(inputRef.current, null).paddingLeft) -
              parseFloat(getComputedStyle(inputRef.current, null).paddingRight) && { title: value })}
        ref={elementRef}
        className={`${show ? `${styles.focusBorder} ` : ''}${className ? `${className} ` : ''}${styles.button}`}
        onClick={() => {
          if (!show) {
            showMenu(true);
            setShow(true);
          } else {
            showMenu(false);
            setShow(false);
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
      <ul className={`${show ? `${styles.show} ` : ''}${styles.list} ${styles.listContainer}`}>
        {list.map(item => (
          <li className={styles.item} {...(value === item && { id: styles.selected })} key={item}>
            <button
              {...(value === item && { disabled: true })}
              {...(show || { tabIndex: '-1' })}
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
      </ul>
    </div>
  );
}
