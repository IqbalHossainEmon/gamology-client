import RangeInputField from '../Components/RangeInputField/RangeInputField';
import styles from './RangeInput.module.css';

export default function RangeInput({ leftInputRef, rightInputRef, disabled }) {
    return (
        <div className={styles.rangeInput}>
            <RangeInputField disabled={disabled} inputRef={leftInputRef} />
            <span className={styles.minus} />
            <RangeInputField disabled={disabled} inputRef={rightInputRef} />
        </div>
    );
}
