import { useEffect, useState } from 'react';
import LinksList from '../../../LinksList/LinksList';
import styles from './SecondNavRightLinks.module.css';

export default function SecondNavRightLinks({ screenWidth }) {
  const [links, setlinks] = useState([]);

  useEffect(() => {
    if (screenWidth > 768) {
      setlinks([
        {
          no: 0,
          name: 'Wishlist',
          URL: '#wishlist',
        },
        { no: 1, name: 'Cart', URL: '#cart' },
      ]);
    } else {
      setlinks([
        {
          no: 0,
          name: (
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
          ),
          URL: '#wishlist',
        },
        {
          no: 1,
          name: (
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
          ),
          URL: '#cart',
        },
      ]);
    }
  }, [screenWidth]);

  return (
    <ul className={styles.links}>
      <LinksList styles={styles} links={links} onclick={null} />
    </ul>
  );
}
