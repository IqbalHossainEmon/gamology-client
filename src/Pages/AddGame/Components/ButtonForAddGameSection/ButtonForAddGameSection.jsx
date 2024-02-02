import { useRef } from 'react';
import ButtonWaterEffect from '../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './ButtonForAddGameSection.module.css';

export default function ButtonForAddGameSection({ onClick, text, disabled = false, submit }) {
  const btnRef = useRef(null);

  return (
    <div className={styles.addMoreButton}>
      <button
        ref={btnRef}
        className={styles.btn}
        onClick={onClick}
        type={submit ? 'submit' : 'button'}
        {...(disabled && { disabled })}
      >
        {text}
        <ButtonWaterEffect btnRef={btnRef} />
      </button>
    </div>
  );
}
