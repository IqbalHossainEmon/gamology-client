import SelectionField from '../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../Shared/TextField/TextField';
import styles from './SectionFieldContainer.module.css';

const listArr = [
  'CPU',
  'Memory',
  'GPU',
  'Storage',
  'OS',
  'DirectX',
  'Resolution',
  'Preset / Target',
  'Peripherals',
  'Others',
];

export default function SectionFieldContainer({
  requiredLength,
  index,
  parentIndex,
  name,
  gameSpecifications,
}) {
  const handleSetState = (n, value) => {
    gameSpecifications[parentIndex].systemReq[index][n] = value;
  };

  return (
    <>
      {[...Array(requiredLength).keys()].map((length, i) => (
        <div key={length} className={styles.specsContainer}>
          <div className={styles.selectionField}>
            <SelectionField
              name="Key Type"
              placeholder="Required"
              htmlFor={`${name}${length}${i}${index}`}
              setState={(value, n) => handleSetState(n, value)}
              list={listArr}
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
        </div>
      ))}
    </>
  );
}
