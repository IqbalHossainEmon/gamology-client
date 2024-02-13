import { useState } from 'react';
import ErrorMessage from '../../../../../../Shared/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../Shared/TextField/TextField';
import styles from './SectionFieldTextFieldContainer.module.css';

const listArr = ['CPU', 'Memory', 'GPU', 'Storage', 'OS', 'DirectX', 'Resolution', 'Preset / Target', 'Peripherals', 'Others'];

export default function SectionFieldTextFieldContainer({ requiredLength, index, parentIndex, name, gameSpecifications, keysRef = [] }) {
  const [, setVal] = useState(false);
  const handleSetState = (value, i, isKey) => {
    switch (isKey) {
      case true:
        gameSpecifications[parentIndex].systemReq[i][index].key = value;
        keysRef[i] = value;
        setVal(prev => !prev);
        break;
      default:
        gameSpecifications[parentIndex].systemReq[i][index].value = value;
        break;
    }
  };

  return (
    <>
      {[...Array(requiredLength).keys()].map((length, i) => (
        <div key={length} className={styles.specsContainer}>
          <div className={styles.selectionField}>
            <SelectionField
              name="Key Type"
              placeholder="Required"
              htmlFor={`${parentIndex}${name}${length}${i}${index}`}
              setState={value => handleSetState(value, i, true)}
              list={listArr.filter(la => !keysRef.includes(la))}
            />
          </div>
          <div className={styles.textField}>
            <TextField
              setState={value => handleSetState(value, i)}
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
