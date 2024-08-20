import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './IndiGameViewMoreButton.module.css';

export default function IndiGameViewMoreButton({ handleChange }) {
    const btnRef = useRef(null);
    return (
        <div className={styles.individualGameViewMoreButton}>
            <button
                onClick={() => handleChange({ type: 'viewMore' })}
                ref={btnRef}
                type="button"
            >
                View More &rarr;
                <ButtonWaterEffect btnRef={btnRef} />
            </button>
        </div>
    );
}
