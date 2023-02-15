import { useRef, useState } from 'react';
import useDropDownHide from '../../../../../Hooks/useDropDownHide';
import styles from './SortButtons.module.css';

const links = [
  {
    no: 0,
    name: 'New release',
    URL: '#new',
  },
  {
    no: 1,
    name: 'Comming Soon',
    URL: '#comming',
  },
  {
    no: 2,
    name: 'Rating',
    URL: '#rating',
  },
  {
    no: 3,
    name: 'Discount',
    URL: '#discount',
  },
  {
    no: 4,
    name: 'A → Z',
    URL: '#atoz',
  },
  {
    no: 5,
    name: 'Price (High → Low)',
    URL: '#pricehtl',
  },
  {
    no: 6,
    name: 'Price (Low → High)',
    URL: '#pricelth',
  },
];

export default function SortButtons({ state, handleChange }) {
  const [show, setShow] = useState(false);
  const dropDownRef = useRef();
  const showMenu = useDropDownHide(setShow);

  const handleClick = () => {
    setShow((prev) => !prev);
    showMenu(dropDownRef.current);
  };

  return (
    <div ref={dropDownRef} className={styles.RightSide}>
      <button onClick={handleClick} className={styles.button} type="button">
        Show : <span>{state.sortBy}</span>{' '}
        <div className={styles.downArrow} id={show ? styles.arrowDown : styles.arrowUp}>
          &#60;
        </div>
      </button>
      <div className={styles.sortLists} {...(!show && { hidden: true })}>
        <ol>
          {links.map((link) => (
            <li key={link.no}>
              <button
                {...(link.name === state.sortBy
                  ? { id: styles.active }
                  : {
                      onClick: () => {
                        setShow(false);
                        handleChange({ type: 'sort', value: link.name, URL: link.URL });
                      },
                    })}
                className={styles.sortButtons}
                type="button"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
