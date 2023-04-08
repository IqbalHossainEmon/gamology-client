import RangeInputField from '../Components/RangeInputField/RangeInputField';
import styles from './RangeInput.module.css';

export default function RangeInput({ value, setValue, limit }) {
  return (
    <div className={styles.rangeInput}>
      <RangeInputField state={value} setState={setValue} knob="knob1" limit={limit} />
      <span className={styles.minus} />
      <RangeInputField state={value} setState={setValue} knob="knob2" limit={limit} />
    </div>
  );
}
