import { useRef, useState } from 'react';
import useDropDownHide from '../../../../Hooks/useDropDownHide';
import ScreenShadow from '../../../ScreenShadow/ScreenShadow';
import styles from './SecondNavSearchField.module.css';

export default function SecondNavSearchField({ screenWidth }) {
  const searchRef = useRef();
  const searchInputRef = useRef();
  const [show, setShow] = useState(false);

  const showMenu = useDropDownHide(setShow);

  const handleBlurEsc = (e) => {
    if (e.key === 'Escape') {
      setShow(false);
      searchInputRef.current.blur();
      searchRef.current.removeEventListener('keydown', handleBlurEsc);
    }
  };

  const handleSearchClick = () => {
    setShow(true);
    showMenu(searchRef.current);
    searchInputRef.current.focus();
    searchRef.current.addEventListener('keydown', handleBlurEsc);
  };

  return (
    <>
      <div
        ref={searchRef}
        role="button"
        tabIndex="0"
        onClick={handleSearchClick}
        className={styles.searchField}
        id={show ? styles.show : styles.hide}
      >
        <div id={styles.searchIcon}>
          <svg width={25} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M90.829 85.172 68.128 62.471A35.846 35.846 0 0 0 76 40C76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.471-7.873l22.701 22.701A3.988 3.988 0 0 0 88 92a4 4 0 0 0 2.829-6.828zM40 68c-15.464 0-28-12.536-28-28s12.536-28 28-28c15.465 0 28 12.536 28 28S55.465 68 40 68z" />
          </svg>
        </div>
        <input
          ref={searchInputRef}
          onMouseDown={handleSearchClick}
          placeholder="Search Here"
          type="text"
        />
      </div>
      {screenWidth <= 768 && <ScreenShadow show={show} />}
    </>
  );
}
