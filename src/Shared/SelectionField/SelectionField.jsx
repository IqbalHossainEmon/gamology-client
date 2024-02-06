import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Hooks/useDropDownHide';
import ButtonWaterEffect from '../ButtonWaterEffect/ButtonWaterEffect';
import RotateArrow from '../RotateArrow/RotateArrow';
import styles from './SelectionField.module.css';

export default function SelectionField({
  placeholder = 'Type',
  className,
  htmlFor,
  setState,
  list = [],
  name = '',
  ...rest
}) {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);

  const elementRef = useRef(null);
  const containerRef = useRef(null);

  const { showMenu, setElement } = useDropDownHide(setShow);

  useEffect(() => {
    setElement(containerRef.current);
  }, [setElement]);

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        type="button"
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
        }}
      >
        <label
          className={`${show ? `${styles.focused} ` : value ? `${styles.textFilled} ` : ''}${styles.label}`}
          htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
        >
          {placeholder}
        </label>
        <input
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
