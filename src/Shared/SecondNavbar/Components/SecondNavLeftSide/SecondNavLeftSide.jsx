import { useRef, useState } from 'react';
import styles from './SecondNavLeftSide.module.css';

export default function SecondNavLeftSide({ screenWidth }) {
  const searchRef = useRef();

  const [navTextState, setNavTextState] = useState(styles.discover);
  const [navShow, setNavShow] = useState(false);

  const handleBlurEsc = (e) => {
    if (e.key === 'Escape') {
      searchRef.current.blur();
      searchRef.current.removeEventListener('keydown', handleBlurEsc);
    }
  };

  const handleSearchClick = () => {
    searchRef.current.focus();
    searchRef.current.addEventListener('keydown', handleBlurEsc);
  };

  return (
    <>
      <div className={styles.leftSide}>
        <div role="button" tabIndex="0" onClick={handleSearchClick} className={styles.searchField}>
          <div id={styles.searchIcon}>
            <svg width={25} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M90.829 85.172 68.128 62.471A35.846 35.846 0 0 0 76 40C76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.471-7.873l22.701 22.701A3.988 3.988 0 0 0 88 92a4 4 0 0 0 2.829-6.828zM40 68c-15.464 0-28-12.536-28-28s12.536-28 28-28c15.465 0 28 12.536 28 28S55.465 68 40 68z" />
            </svg>
          </div>
          <input
            onClick={handleSearchClick}
            ref={searchRef}
            placeholder="Search Here"
            type="text"
          />
        </div>
        {screenWidth <= 768 ? (
          <>
            <div
              role="button"
              tabIndex="0"
              onClick={() => setNavShow(true)}
              className={styles.navLinks}
            >
              <div id={navTextState} className={styles.navLinkOverFlow}>
                <p>Discover</p>
                <p>Browse</p>
                <p>News</p>
              </div>
              <div className={styles.navArrow}>&#60;</div>
            </div>
            <button
              type="button"
              onClick={() => setNavShow(false)}
              id={navShow ? styles.navTopOpened : ''}
              className={styles.navCloseTopButton}
            />
          </>
        ) : (
          <div className={styles.navLinks}>
            <a href="#Discover">Discover</a>
            <a href="#Browse">Browse</a>
            <a href="#News">News</a>
          </div>
        )}
      </div>
      {screenWidth <= 768 && (
        <div id={navShow ? styles.navShow : styles.navHide} className={styles.navLinksSlider}>
          <a
            onClick={() => {
              setNavTextState(styles.discover);
              setNavShow(false);
            }}
            href="#hello"
          >
            Discover
          </a>
          <a
            onClick={() => {
              setNavTextState(styles.browse);
              setNavShow(false);
            }}
            href="#hello"
          >
            Browse
          </a>
          <a
            onClick={() => {
              setNavTextState(styles.news);
              setNavShow(false);
            }}
            href="#hello"
          >
            News
          </a>
          <button
            type="button"
            onClick={() => setNavShow(false)}
            id={navShow ? styles.navBottomOpened : styles.navBottomClosed}
            className={styles.navCloseBottomButton}
          />
        </div>
      )}
    </>
  );
}
