import { useState } from 'react';
import useScreenWidth from '../../Hooks/useScreenWidth';

import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
  const screenWidth = useScreenWidth();
  const [navTextState, setNavTextState] = useState(styles.discover);
  const [navShow, setNavShow] = useState(false);

  const handleSearchClick = () => {
    window.document.getElementById('searchGameField').focus();

    window.document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.document.getElementById('searchGameField').blur();
        window.document.getElementById('searchGameField').removeEventListener('keydown');
      }
    });
  };

  return (
    <div className={styles.SecondNavbar}>
      <div className={styles.leftSide}>
        <div role="button" tabIndex="0" onClick={handleSearchClick} className={styles.searchField}>
          <div id={styles.searchIcon}>
            <svg width={25} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M90.829 85.172 68.128 62.471A35.846 35.846 0 0 0 76 40C76 20.118 59.883 4 40 4 20.118 4 4 20.118 4 40s16.118 36 36 36c8.5 0 16.312-2.946 22.471-7.873l22.701 22.701A3.988 3.988 0 0 0 88 92a4 4 0 0 0 2.829-6.828zM40 68c-15.464 0-28-12.536-28-28s12.536-28 28-28c15.465 0 28 12.536 28 28S55.465 68 40 68z" />
            </svg>
          </div>
          <input
            onClick={handleSearchClick}
            id="searchGameField"
            placeholder="Search Here"
            type="text"
          />
        </div>
        {screenWidth <= 768 ? (
          <div
            role="button"
            tabIndex="0"
            onClick={() => setNavShow(true)}
            className={styles.navLinks}
          >
            <div id={navTextState} className={styles.navLinkOverFlow}>
              <p href="#Discover">Discover</p>
              <p href="#Browse">Browse</p>
              <p href="#News">News</p>
            </div>
            <div className={styles.navArrow}>&#60;</div>
          </div>
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
            id={navShow ? styles.navOpened : styles.navClosed}
            className={styles.navCloseButton}
          />
        </div>
      )}
      <div className={styles.rightSide}>
        <a href="#wkwk">
          {screenWidth >= 768 ? (
            'Wishlist'
          ) : (
            <svg
              id={styles.wishList}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0z" />
            </svg>
          )}
        </a>
        <a href="#wkwk">
          {screenWidth >= 768 ? (
            'Cart'
          ) : (
            <svg
              id={styles.cart}
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z" />
            </svg>
          )}
        </a>
      </div>
    </div>
  );
}
