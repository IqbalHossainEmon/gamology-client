import { useCallback, useEffect, useRef, useState } from 'react';
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

    const handleInputEvent = useRef(null);

    handleInputEvent.current = useCallback(() => {
        fieldRef.current.style.height = 'auto';
        fieldRef.current.style.height = `${fieldRef.current.scrollHeight}px`;
    }, []);

    useEffect(() => {
        const holdFieldRef = fieldRef.current;
        if (field === 'textarea') {
            holdFieldRef.addEventListener('input', handleInputEvent.current);
        }

        return () => {
            if (field === 'textarea') {
                holdFieldRef.removeEventListener('input', handleInputEvent.current);
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
        <div className={`${className ? `${className} ` : ''}${styles.textFieldMainContainer}`}>
            <div className={`${errorShow ? `${styles.error} ` : focused ? `${styles.focusBorder} ` : ''}${styles.container}`}>
                <label
                    className={`${focused ? `${styles.focused} ` : value || defaultValue ? `${styles.textFilled} ` : ''}${styles.label}`}
                    {...(errorShow && { id: styles.errorColor })}
                    htmlFor={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
                >
                    {placeholder}
                </label>
                {field === 'input' ? (
                    <input
                        {...(enabled || { disabled: true, readOnly: true })}
                        ref={fieldRef}
                        onFocus={() => {
                            setFocused(true);
                            if (errorShow) setErrorShow(false);
                            if (onFocusClick) {
                                onFocusClick();
                            }
                        }}
                        value={value}
                        onChange={e => {
                            setValue(e.target.value);
                            handleChange(e.target.value);
                        }}
                        onBlur={e => {
                            setState(e.target.value, e.target.name);
                            setFocused(false);
                        }}
                        id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
                        className={styles.field}
                        autoComplete="off"
                        {...rest}
                    />
                ) : (
                    <textarea
                        ref={fieldRef}
                        onFocus={() => {
                            setFocused(true);
                            if (errorShow) setErrorShow(false);
                        }}
                        value={value}
                        onChange={e => {
                            setValue(e.target.value);
                            handleChange(e.target.value);
                        }}
                        onBlur={e => {
                            setState(e.target.value, e.target.name);
                            setFocused(false);
                        }}
                        id={placeholder ? `${placeholder}_${htmlFor}` : htmlFor}
                        className={[styles.textarea, styles.field].join(' ')}
                        rows={10}
                        {...rest}
                    />
                )}
            </div>
            <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
        </div>
    );
}
