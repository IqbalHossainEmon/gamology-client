import RangeInputField from '../Components/RangeInputField/RangeInputField';
import styles from './RangeInput.module.css';

export default function RangeInput({
  value,
  limit,
  everyStep,
  float,
  step,
  setValue,
  lowerLim,
  handleSetValue: handleValue,
}) {
  const handleSetValue = (val, knob) => {
    const { knob1, knob2 } = value;

    let newVal =
      float === 0 ? (Math.round(val) - lowerLim) / everyStep : (val - lowerLim) / everyStep;

    if (newVal > 100) {
      newVal = 100;
    } else if (newVal < 0) {
      newVal = 0;
    }

    switch (knob) {
      case 'knob1':
        if (knob1 <= knob2) {
          setValue((prev) => ({ ...prev, knob1: newVal, transition: true }));
        } else {
          setValue((prev) => ({ ...prev, knob2: newVal, transition: true }));
        }
        break;
      case 'knob2':
        if (knob1 >= knob2) {
          setValue((prev) => ({ ...prev, knob1: newVal, transition: true }));
        } else {
          setValue((prev) => ({ ...prev, knob2: newVal, transition: true }));
        }
        break;
      default:
        return;
    }

    setTimeout(() => {
      setValue((prev) => ({ ...prev, transition: false }));
    }, 300);
    handleValue();
  };

  return (
    <div className={styles.rangeInput}>
      <RangeInputField
        float={float}
        step={step}
        lowerLim={lowerLim}
        everyStep={everyStep}
        handleSetValue={handleSetValue}
        setMainValue={setValue}
        state={value}
        knob="knob1"
        limit={limit}
      />
      <span className={styles.minus} />
      <RangeInputField
        float={float}
        step={step}
        lowerLim={lowerLim}
        everyStep={everyStep}
        handleSetValue={handleSetValue}
        setMainValue={setValue}
        state={value}
        knob="knob2"
        limit={limit}
      />
    </div>
  );
}
