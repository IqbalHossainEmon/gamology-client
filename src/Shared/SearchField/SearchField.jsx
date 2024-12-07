import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../Utils/Hooks/useDropDownHide';
import useScreenWidth from '../../Utils/Hooks/useScreenWidth';
import SuggestionList from '../SuggestionList/SuggestionList/SuggestionList';
import styles from './SearchField.module.css';

export default function SearchField({ setNavShow }) {
	const [btnShow, setBtnShow] = useState(false);
	const [value, setValue] = useState('');
	const [listShow, setListShow] = useState(false);

	const searchRef = useRef(null);
	const searchInputRef = useRef(null);
	const eventRefs = useRef(null);

	const btnShowRef = useRef(btnShow);
	btnShowRef.current = btnShow;

	const isListShownRef = useRef(listShow);
	isListShownRef.current = listShow;

	const screenWidth = useScreenWidth();

	if (!eventRefs.current) {
		eventRefs.current = {
			handleClose: isFormDismount => {
				setBtnShow(false);
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

	const { showMenu, setElement, onHide } = useDropDownHide(eventRefs.current.handleClose);

	if (!eventRefs.current.handleChange) {
		eventRefs.current = {
			...eventRefs.current,
			handleChange: e => {
				setValue(e.target.value);
				if (!isListShownRef.current && e.target.value) {
					showMenu();
					setListShow(true);
				}
				if (isListShownRef.current && !e.target.value) {
					onHide();
					setListShow(false);
				}
			},
			handleSearchClick: e => {
				if (btnShowRef.current) return;

				e.preventDefault();
				setElement(searchRef.current);
				setBtnShow(true);
				setNavShow(true);
				showMenu();
				searchInputRef.current.focus();
				searchRef.current.addEventListener('keydown', eventRefs.current.handleBlurEsc);
				window.addEventListener('blur', eventRefs.current.handleBlurOnWindowBlur);
			},
			handleBlurOnWindowBlur: () => {
				setBtnShow(false);
				setNavShow(false);
				searchInputRef.current.blur();
				searchRef.current.removeEventListener('keydown', eventRefs.current.handleBlurEsc);
				window.removeEventListener('blur', eventRefs.current.handleBlurOnWindowBlur);
			},
			handleBlurEsc: e => {
				if (e.key === 'Escape' || e.key === 'Enter') {
					setBtnShow(false);
					setNavShow(false);
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

	useEffect(() => {
		const cleanUp = eventRefs.current.handleClose;
		return () => {
			if (btnShowRef.current) onHide();
			cleanUp(true);
		};
	}, [searchRef, onHide]);

	return (
		<>
			<button
				ref={searchRef}
				type='button'
				onClick={eventRefs.current.handleSearchClick}
				className={`${styles.searchField}${btnShow ? ` ${styles.show}` : screenWidth <= 768 ? ` ${styles.hide}` : ''}`}
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
					value={typeof value === 'string' ? value : value.name}
				/>
			</button>
			<SuggestionList
				setSuggestionRef={ref => setElement([searchRef.current, ref])}
				name='secondNavbar'
				setShow={setListShow}
				setState={(...rest) => {
					console.log(...rest);
				}}
				setValue={val => {
					setValue(val);
				}}
				className={styles.suggestionList}
				state={listShow && btnShow}
				value={typeof value === 'string' ? value : value.name}
				elementRef={searchRef}
				noPositionChange
			/>
		</>
	);
}
