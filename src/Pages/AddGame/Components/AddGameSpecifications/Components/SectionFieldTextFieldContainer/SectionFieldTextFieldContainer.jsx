import { useState } from 'react';
import ErrorMessage from '../../../../../../Shared/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../Shared/TextField/TextField';
import styles from './SectionFieldTextFieldContainer.module.css';

const listArr = ['CPU', 'Memory', 'GPU', 'Storage', 'OS', 'DirectX', 'Resolution', 'Preset / Target', 'Peripherals', 'Others'];

export default function SectionFieldTextFieldContainer({
  requiredLength,
  index,
  parentIndex,
  name,
  handleSetState,
  keysRef,
  parenterrorShow,
}) {
  const [, setVal] = useState(false);

  return (
    <>
      {[...Array(requiredLength).keys()].map((length, i) => (
        <div key={length} className={styles.specsContainer}>
          <div className={styles.selectionField}>
            <SelectionField
              name="Key Type"
              placeholder="Required"
              htmlFor={`${parentIndex}${name}${length}${i}${index}`}
              setState={value => {
                handleSetState(value, i, index, keysRef);
                setVal(prev => !prev);
              }}
              list={listArr.filter(la => !keysRef.includes(la))}
            />
          </div>
          <div className={styles.textField}>
            <TextField
              setState={value => handleSetState(value, i, index)}
              field="input"
              htmlFor={`${name}_${length}`}
              placeholder="Required Specs"
            />
          </div>
          <ErrorMessage />
        </div>
      ))}
    </>
  );
}
