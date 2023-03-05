import { useRef, useState } from 'react';
import useDropDownHide from '../../../../../Hooks/useDropDownHide';
import RotateArrow from '../../../../../Shared/RotateArrow/RotateArrow';
import styles from './SortButtons.module.css';

const links = [
  {
    no: 0,
    name: 'New Release',
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
  const [show, setShow] = useState();
  const dropDownRef = useRef();

  const showMenu = useDropDownHide(setShow);

  return (
    <div ref={dropDownRef} className={styles.RightSide}>
      <button
        onClick={() => {
          showMenu(dropDownRef.current);
          setShow((prev) => !prev);
        }}
        className={styles.button}
        type="button"
      >
        Show : <span className={styles.sortBy}>{state.sortBy}</span>
        <div className={styles.downArrow}>
          <RotateArrow state={show} />
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
