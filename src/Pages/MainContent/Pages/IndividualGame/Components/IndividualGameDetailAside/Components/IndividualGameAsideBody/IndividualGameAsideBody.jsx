import { useState } from 'react';
import styles from './IndividualGameAsideBody.module.css';

export default function IndividualGameAsideBody({ info }) {
  const [addedToCart, setAddedToCart] = useState(false);

  const [wishListState, setWishListState] = useState(0);

  const handleAddingCart = () => {
    setAddedToCart(true);
  };

  const handleAddingWishList = () => {
    setWishListState(1);

    setTimeout(() => {
      setWishListState(-1);
    }, 4000);
  };

  return (
    <div className={styles.individualGameAsideBody}>
      <button
        onClick={handleAddingCart}
        className={[styles.btn, styles.cartBtn].join(' ')}
        {...(addedToCart && { disabled: true })}
        type="button"
      >
        {addedToCart ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
              <g fill="none" fillRule="evenodd">
                <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="2" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 8.5C8 8.22386 8.22386 8 8.5 8H9.9C10.1761 8 10.4 8.22386 10.4 8.5V9.9C10.4 10.1761 10.1761 10.4 9.9 10.4H8.5C8.22386 10.4 8 10.1761 8 9.9V8.5ZM8.5 11.6C8.22386 11.6 8 11.8239 8 12.1V13.5C8 13.7761 8.22386 14 8.5 14H9.9C10.1761 14 10.4 13.7761 10.4 13.5V12.1C10.4 11.8239 10.1761 11.6 9.9 11.6H8.5ZM12.1 11.6C11.8239 11.6 11.6 11.8239 11.6 12.1V13.5C11.6 13.7761 11.8239 14 12.1 14H13.5C13.7761 14 14 13.7761 14 13.5V12.1C14 11.8239 13.7761 11.6 13.5 11.6H12.1ZM12.1 8C11.8239 8 11.6 8.22386 11.6 8.5V9.9C11.6 10.1761 11.8239 10.4 12.1 10.4H13.5C13.7761 10.4 14 10.1761 14 9.9V8.5C14 8.22386 13.7761 8 13.5 8H12.1Z"
                  fill="currentColor"
                />
              </g>
            </svg>{' '}
            In Library
          </>
        ) : (
          'Add to Cart'
        )}
      </button>
      <button
        className={[styles.btn, styles.wishlistBtn].join(' ')}
        type="button"
        onClick={handleAddingWishList}
      >
        <div
          className={
            wishListState <= 0 ? styles.outerCircle : [styles.rotate, styles.outerCircle].join(' ')
          }
        >
          {wishListState >= 0 ? (
            <div className={styles.plus} />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg css-uwwqev"
              viewBox="-10 -10 468.8 468.8"
            >
              <path
                fill="currentColor"
                strokeWidth="10"
                stroke="currentColor"
                d="M142.8 323.85L35.7 216.75 0 252.45l142.8 142.8 306-306-35.7-35.7z"
              />
            </svg>
          )}
        </div>
        Add to Wishlist
      </button>
      {info.map(information => (
        <div className={styles.gameInfo} key={information.id}>
          <p className={styles.key}>{information.key}</p>
          <div className={styles.value}>
            {information.key === 'Platform' ? (
              information.value === 'windows' ? (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.00854492 12.5L0 4.88101L9.375 3.60796V12.5H0.00854492ZM10.9375 3.38091L23.4344 1.5625V12.5H10.9375V3.38091ZM23.4375 14.0625L23.4344 25L10.9375 23.2418V14.0625H23.4375ZM9.375 23.0429L0.00761719 21.7588L0.00712891 14.0625H9.375V23.0429Z"
                    fill="white"
                  />
                </svg>
              ) : information.value === 'macOs' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg css-uwwqev"
                  viewBox="0 0 105 43"
                >
                  <title>Mac OS</title>
                  <g>
                    <path
                      d="M40.152 39.6706H34.5029V10.4623H34.3002L22.3433 39.3667H17.7834L5.80114 10.4623H5.59848V39.6706H0V0H7.11843L19.962 31.3109H20.19L32.9829 0H40.1267V39.6706H40.152Z"
                      fill="currentColor"
                    />
                    <path
                      d="M46.2617 31.4377C46.2617 26.3459 50.1376 23.4327 57.2814 23.002L64.9571 22.5207V20.3421C64.9571 17.1249 62.8292 15.377 59.08 15.377C55.9641 15.377 53.7095 16.9729 53.2535 19.4048H47.6803C47.8577 14.2623 52.6962 10.5385 59.232 10.5385C66.2744 10.5385 70.8596 14.2117 70.8596 19.9368V39.6708H65.1598V34.9083H65.0078C63.3865 38.0242 59.8146 39.9748 55.9387 39.9748C50.2643 39.9748 46.2617 36.5549 46.2617 31.4377ZM64.9571 28.9045V26.6752L58.1173 27.1312C54.2668 27.3845 52.2655 28.8032 52.2655 31.3111C52.2655 33.743 54.3681 35.3136 57.636 35.3136C61.7905 35.2629 64.9571 32.603 64.9571 28.9045Z"
                      fill="currentColor"
                    />
                    <path
                      d="M96.5139 20.798C95.9819 17.7328 93.626 15.4528 89.7501 15.4528C85.2156 15.4528 82.201 19.278 82.201 25.2312C82.201 31.387 85.2409 35.0602 89.8008 35.0602C93.4486 35.0602 95.8806 33.2362 96.5645 29.8923H102.264C101.631 35.9975 96.7672 40 89.7754 40C81.5424 40 76.1719 34.4015 76.1719 25.2312C76.1719 16.2888 81.5677 10.4877 89.7248 10.4877C97.1218 10.4877 101.707 15.1235 102.214 20.7727H96.5139V20.798Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              ) : (
                <div className={styles.logos}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.00854492 12.5L0 4.88101L9.375 3.60796V12.5H0.00854492ZM10.9375 3.38091L23.4344 1.5625V12.5H10.9375V3.38091ZM23.4375 14.0625L23.4344 25L10.9375 23.2418V14.0625H23.4375ZM9.375 23.0429L0.00761719 21.7588L0.00712891 14.0625H9.375V23.0429Z"
                      fill="white"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg css-uwwqev"
                    viewBox="0 0 105 43"
                  >
                    <title>Mac OS</title>
                    <g>
                      <path
                        d="M40.152 39.6706H34.5029V10.4623H34.3002L22.3433 39.3667H17.7834L5.80114 10.4623H5.59848V39.6706H0V0H7.11843L19.962 31.3109H20.19L32.9829 0H40.1267V39.6706H40.152Z"
                        fill="currentColor"
                      />
                      <path
                        d="M46.2617 31.4377C46.2617 26.3459 50.1376 23.4327 57.2814 23.002L64.9571 22.5207V20.3421C64.9571 17.1249 62.8292 15.377 59.08 15.377C55.9641 15.377 53.7095 16.9729 53.2535 19.4048H47.6803C47.8577 14.2623 52.6962 10.5385 59.232 10.5385C66.2744 10.5385 70.8596 14.2117 70.8596 19.9368V39.6708H65.1598V34.9083H65.0078C63.3865 38.0242 59.8146 39.9748 55.9387 39.9748C50.2643 39.9748 46.2617 36.5549 46.2617 31.4377ZM64.9571 28.9045V26.6752L58.1173 27.1312C54.2668 27.3845 52.2655 28.8032 52.2655 31.3111C52.2655 33.743 54.3681 35.3136 57.636 35.3136C61.7905 35.2629 64.9571 32.603 64.9571 28.9045Z"
                        fill="currentColor"
                      />
                      <path
                        d="M96.5139 20.798C95.9819 17.7328 93.626 15.4528 89.7501 15.4528C85.2156 15.4528 82.201 19.278 82.201 25.2312C82.201 31.387 85.2409 35.0602 89.8008 35.0602C93.4486 35.0602 95.8806 33.2362 96.5645 29.8923H102.264C101.631 35.9975 96.7672 40 89.7754 40C81.5424 40 76.1719 34.4015 76.1719 25.2312C76.1719 16.2888 81.5677 10.4877 89.7248 10.4877C97.1218 10.4877 101.707 15.1235 102.214 20.7727H96.5139V20.798Z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </div>
              )
            ) : information.key === 'Release Date' ? (
              <p>
                {information.value.getDate()}/{information.value.getMonth()}/
                {information.value.getFullYear()}
              </p>
            ) : (
              <p>{information.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
