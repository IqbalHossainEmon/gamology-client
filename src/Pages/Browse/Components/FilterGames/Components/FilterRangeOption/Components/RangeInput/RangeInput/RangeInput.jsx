import RangeInputField from '../Components/RangeInputField/RangeInputField';
import styles from './RangeInput.module.css';

export default function RangeInput({ value, limit, everyStep, float }) {
  const handleSetValue = (val, knob) => {
    console.log(typeof val, knob);
  };

  return (
    <div className={styles.rangeInput}>
      <RangeInputField
        float={float}
        everyStep={everyStep}
        handleSetValue={handleSetValue}
        state={value}
        knob="knob1"
        limit={limit}
      />
      <span className={styles.minus} />
      <RangeInputField
        float={float}
        everyStep={everyStep}
        handleSetValue={handleSetValue}
        state={value}
        knob="knob2"
        limit={limit}
      />
    </div>
  );
}
