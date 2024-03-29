import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './IndiGameAsideBodyBtn.module.css';

const IndiGameAsideBodyBtn = () => {
  const buyButtonRef = useRef(null);
  const cartButtonRef = useRef(null);
  const wishlistBtnRef = useRef(null);

  const [isBought, setIsBought] = useState(false);

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
    <>
      {isBought || (
        <button ref={buyButtonRef} type="button" className={`${styles.buyNow} ${styles.btn}`}>
          Buy Now
          <ButtonWaterEffect btnRef={buyButtonRef} backGround="rgb(11 52 90)" long />
        </button>
      )}
      <button
        ref={cartButtonRef}
        onClick={handleAddingCart}
        className={`${styles.btn} ${styles.cartBtn}`}
        {...((addedToCart || isBought) && { disabled: true })}
        type="button"
      >
        {addedToCart || isBought ? (
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
            </svg>
            In Library
          </>
        ) : (
          'Add to Cart'
        )}
        <ButtonWaterEffect btnRef={cartButtonRef} backGround="rgb(5 132 255)" long />
      </button>
      {isBought || (
        <button ref={wishlistBtnRef} className={[styles.btn, styles.wishlistBtn].join(' ')} type="button" onClick={handleAddingWishList}>
          <div className={`${wishListState > 0 ? `${styles.rotate} ` : ''}${styles.outerCircle}`}>
            {wishListState >= 0 ? (
              <div className={styles.plus} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 468.8 468.8">
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
          <ButtonWaterEffect btnRef={wishlistBtnRef} backGround="grey" long />
        </button>
      )}
    </>
  );
};
export default IndiGameAsideBodyBtn;
