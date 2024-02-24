import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './IndiGameViewMoreButton.module.css';

export default function IndiGameViewMoreButton({ handleChange }) {
  const btnRef = useRef(null);
  return (
    <div className={styles.individualGameViewMoreButton}>
      <button ref={btnRef} onClick={() => handleChange({ type: 'viewMore' })} type="button">
        View More &rarr;
        <ButtonWaterEffect btnRef={btnRef} />
      </button>
    </div>
  );
}
