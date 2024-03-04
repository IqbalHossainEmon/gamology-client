import {useState} from 'react';
import RotateArrow from '../../../../../../Shared/RotateArrow/RotateArrow';
import styles from './DrawerOptions.module.css';

const DrawerOptions = ({ option }) =>{
const [show, setShow] = useState(false);

 return option.subDrawer ? 
    <li className={styles.outerOptionContainer}>
      <button onClick={() => setShow(prev=> !prev)} className={`${styles.outerOption} ${styles.optionButton}`} type="button">
        {option.name}
        <div className={styles.arrowButton}>
          <RotateArrow state={show} />
        </div>
      </button>
      <ul className={styles.innerOptionContainer}>
        {option.subDrawer.map(subOption => (
          <li className={styles.innerOptionContainer} key={subOption.id}>
            <p className={styles.innerOption}>{subOption.name}</p>
          </li>
        ))}
      </ul>
    </li>
  : (
    <li className={styles.outerOptionContainer}>
      <p className={styles.outerOption}>{option.name}</p>
    </li>
  )};
export default DrawerOptions;
