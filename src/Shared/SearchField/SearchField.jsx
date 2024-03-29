import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Hooks/useDropDownHide';
import styles from './SearchField.module.css';

export default function SearchField({ setNavShow = () => {}, change }) {
    const searchRef = useRef(null);
    const searchInputRef = useRef(null);
    const debounceIdRef = useRef(null);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');

    const handleChange = e => {
        setValue(e.target.value);
        if (debounceIdRef.current) {
            clearTimeout(debounceIdRef.current);
        }
        debounceIdRef.current = setTimeout(() => {
            change(e.target.value);
        }, 500);
    };

    const setShowState = state => {
        if (typeof setNavShow === 'function') {
            setNavShow(state);
        }
        setShow(state);
    };

    const { showMenu, setElement } = useDropDownHide(setShowState);

    useEffect(() => {
        setElement(searchRef.current);
    }, [setElement, searchRef]);

    let handleBlurEsc;

    const handleBlurOnWindowBlur = () => {
        setShowState(false);
        searchInputRef.current.blur();
        searchRef.current.removeEventListener('keydown', handleBlurEsc);
        window.removeEventListener('blur', handleBlurOnWindowBlur);
    };

    handleBlurEsc = e => {
        if (e.key === 'Escape') {
            setShowState(false);
            searchInputRef.current.blur();
            searchRef.current.removeEventListener('keydown', handleBlurEsc);
            window.removeEventListener('blur', handleBlurOnWindowBlur);
        }
    };

    const handleSearchClick = () => {
        setShowState(true);
        showMenu();
        searchInputRef.current.focus();
        searchRef.current.addEventListener('keydown', handleBlurEsc);
        window.addEventListener('blur', handleBlurOnWindowBlur);
    };

    return (
        <button
            ref={searchRef}
            type="button"
            onClick={handleSearchClick}
            className={styles.searchField}
            id={show ? styles.show : styles.hide}
        >
            <div id={styles.searchIcon}>
                <svg width={25} viewBox="0 0 100 100">
                    <path d="M90.829 85.172 68.128 62.471A35.846 35.846 0 0 0 76 40C76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.471-7.873l22.701 22.701A3.988 3.988 0 0 0 88 92a4 4 0 0 0 2.829-6.828zM40 68c-15.464 0-28-12.536-28-28s12.536-28 28-28c15.465 0 28 12.536 28 28S55.465 68 40 68z" />
                </svg>
            </div>
            <input
                ref={searchInputRef}
                value={value}
                onChange={handleChange}
                onMouseDown={handleSearchClick}
                placeholder="Search Here"
                type="text"
            />
        </button>
    );
}
