import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Hooks/useDropDownHide';
import styles from './SearchField.module.css';

export default function SearchField({ setNavShow = () => {}, setChangedValue }) {
	const [show, setShow] = useState(false);
	const [value, setValue] = useState('');
	const searchRef = useRef(null);
	const searchInputRef = useRef(null);
	const debounceIdRef = useRef(null);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleChange: e => {
				setValue(e.target.value);
				if (debounceIdRef.current) {
					clearTimeout(debounceIdRef.current);
					debounceIdRef.current = null;
				}
				debounceIdRef.current = setTimeout(() => {
					setChangedValue(e.target.value);
				}, 500);
			},
			setShowState: state => {
				if (typeof setNavShow === 'function') {
					setNavShow(state);
				}
				setShow(state);
			},
			handleClose: isFormDismount => {
				eventRefs.current.setShowState(false);
				if (!isFormDismount) {
					searchInputRef.current.blur();
					searchRef.current.removeEventListener(
						'keydown',
						eventRefs.current.handleBlurEsc
					);
				}
				window.removeEventListener('blur', eventRefs.current.handleBlurOnWindowBlur);
			},
			handleBlurOnWindowBlur: () => {
				eventRefs.current.setShowState(false);
				searchInputRef.current.blur();
				searchRef.current.removeEventListener('keydown', eventRefs.current.handleBlurEsc);
				window.removeEventListener('blur', eventRefs.current.handleBlurOnWindowBlur);
			},
			handleBlurEsc: e => {
				if (e.key === 'Escape' || e.key === 'Enter') {
					eventRefs.current.setShowState(false);
					searchInputRef.current.blur();
					searchRef.current.removeEventListener(
						'keydown',
						eventRefs.current.handleBlurEsc
					);
					window.removeEventListener('blur', eventRefs.current.handleBlurOnWindowBlur);
				}
			},
		};
	}

	const { showMenu, setElement, stopMenu } = useDropDownHide(eventRefs.current.handleClose);

	if (!eventRefs.current.handleSearchClick) {
		eventRefs.current.handleSearchClick = e => {
			e.stopPropagation();
			eventRefs.current.setShowState(true);
			showMenu();
			searchInputRef.current.focus();
			searchRef.current.addEventListener('keydown', eventRefs.current.handleBlurEsc);
			window.addEventListener('blur', eventRefs.current.handleBlurOnWindowBlur);
		};
	}

	useEffect(() => {
		setElement(searchRef.current);
		const cleanUp = eventRefs.current.handleClose;
		return () => {
			stopMenu();
			cleanUp(true);
		};
	}, [setElement, searchRef, stopMenu]);

	return (
		<button
			ref={searchRef}
			type="button"
			{...(show
				? {
						onMouseDown: e => {
							e.preventDefault();
							e.stopPropagation();
						},
					}
				: { onClick: eventRefs.current.handleSearchClick })}
			className={styles.searchField}
			id={show ? styles.show : styles.hide}
		>
			<div id={styles.searchIcon}>
				<svg viewBox="0 0 100 100" width={25}>
					<path d="M90.829 85.172 68.128 62.471A35.846 35.846 0 0 0 76 40C76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.471-7.873l22.701 22.701A3.988 3.988 0 0 0 88 92a4 4 0 0 0 2.829-6.828zM40 68c-15.464 0-28-12.536-28-28s12.536-28 28-28c15.465 0 28 12.536 28 28S55.465 68 40 68z" />
				</svg>
			</div>

			<input
				autoComplete="off"
				name="search"
				onChange={eventRefs.current.handleChange}
				placeholder="Search Here"
				ref={searchInputRef}
				type="text"
				value={value}
			/>
		</button>
	);
}
