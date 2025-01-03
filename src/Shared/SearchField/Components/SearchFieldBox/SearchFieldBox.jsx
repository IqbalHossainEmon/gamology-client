import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../../Utils/Hooks/useScreenWidth';
import styles from './SearchFieldBox.module.css';

export default function SearchFieldBox({ setNavShow, setValue, value, searchRef, searchInputRef }) {
	const [searchFocus, setSearchFocus] = useState(false);

	const eventRefs = useRef(null);

	const searchFocusRef = useRef(searchFocus);
	searchFocusRef.current = searchFocus;

	const screenWidth = useScreenWidth();

	if (!eventRefs.current) {
		eventRefs.current = {
			handleClose: isFormDismount => {
				setSearchFocus(false);
				setNavShow(false);
				if (!isFormDismount) {
					searchInputRef.current.blur();
					searchRef.current.removeEventListener(
						'keydown',
						eventRefs.current.handleBlurEsc
					);
				}
				window.removeEventListener('blur', eventRefs.current.handleBlurOnWindowBlur);
			},
		};
	}

	if (!eventRefs.current.handleChange) {
		eventRefs.current = {
			...eventRefs.current,
			handleChange: e => {
				setValue(e.target.value);
			},
			handleSearchClick: e => {
				// check if right click or not

				if (searchFocusRef.current || e.button !== 0) return;
				e.preventDefault();

				searchInputRef.current.focus();
			},
			handleBlurOnWindowBlur: () => {
				searchInputRef.current.blur();
			},
			handleBlurEsc: e => {
				if (e.key === 'Escape' || e.key === 'Enter') {
					setNavShow(false);
					searchInputRef.current.blur();
					searchRef.current.removeEventListener(
						'keydown',
						eventRefs.current.handleBlurEsc
					);
					window.removeEventListener('blur', eventRefs.current.handleBlurOnWindowBlur);
				}
			},
			onFocus: e => {
				setSearchFocus(true);
				setNavShow(true);
				e.target.addEventListener('keydown', eventRefs.current.handleBlurEsc);
			},
			onBlur: e => {
				if (e.relatedTarget && e.relatedTarget === searchRef.current) {
					searchInputRef.current.focus();
					return;
				}

				setSearchFocus(false);
				setNavShow(false);
				e.target.removeEventListener('keydown', eventRefs.current.handleBlurEsc);
			},
		};
	}

	useEffect(() => {
		const cleanUp = eventRefs.current.handleClose;
		const search = searchInputRef.current;

		search.addEventListener('focus', eventRefs.current.onFocus);
		search.addEventListener('blur', eventRefs.current.onBlur);

		return () => {
			cleanUp(true);
			if (search) {
				search.removeEventListener('focus', eventRefs.current.onFocus);
				search.removeEventListener('blur', eventRefs.current.onBlur);
			}
		};
	}, [searchInputRef, searchRef]);

	return (
		<button
			ref={searchRef}
			type='button'
			onClick={eventRefs.current.handleSearchClick}
			className={`${styles.searchField}${searchFocus ? ` ${styles.show}` : screenWidth <= 768 ? ` ${styles.hide}` : ''}`}
		>
			<div className={styles.searchIcon}>
				<svg viewBox='0 0 100 100' width={25}>
					<path d='M90.829 85.172 68.128 62.471A35.846 35.846 0 0 0 76 40C76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.471-7.873l22.701 22.701A3.988 3.988 0 0 0 88 92a4 4 0 0 0 2.829-6.828zM40 68c-15.464 0-28-12.536-28-28s12.536-28 28-28c15.465 0 28 12.536 28 28S55.465 68 40 68z' />
				</svg>
			</div>
			<input
				autoComplete='off'
				name='search'
				onChange={eventRefs.current.handleChange}
				placeholder='Search Here'
				ref={searchInputRef}
				type='text'
				value={value.name || value}
			/>
		</button>
	);
}
