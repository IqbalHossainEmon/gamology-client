import RangeInputField from '../Components/RangeInputField/RangeInputField';
import styles from './RangeInput.module.css';

export default function RangeInput({ state, leftInputRef, rightInputRef, disabled, limit, float }) {
    const handleEnter = e => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
        }
    };

    return (
        <div className={styles.rangeInput}>
            <RangeInputField
                disabled={disabled}
                handleEnter={handleEnter}
                state={state.smaller}
                val={limit.lower.toFixed(float)}
                inputRef={leftInputRef}
            />
            <span className={styles.minus} />
            <RangeInputField
                disabled={disabled}
                handleEnter={handleEnter}
                state={state.bigger}
                inputRef={rightInputRef}
                val={limit.higher.toFixed(float)}
            />
        </div>
    );
}
