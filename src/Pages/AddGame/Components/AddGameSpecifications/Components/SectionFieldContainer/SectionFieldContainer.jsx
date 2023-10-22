import SelectionField from '../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../Shared/TextField/TextField';
import styles from './SectionFieldContainer.module.css';

export default function SectionFieldContainer({ requiredLength, index, name, specificationRef }) {
  const handleSetState = (value, i, isKey) => {
    if (!specificationRef.current[i]) {
      specificationRef.current[i] = [];
    }
    if (!specificationRef.current[i][index]) {
      specificationRef.current[i][index] = {};
    }

    switch (isKey) {
      case true:
        specificationRef.current[i][index].key = value;
        break;
      default:
        specificationRef.current[i][index].value = value;
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
              htmlFor={`${name}${length}${i}${index}`}
              setState={value => handleSetState(value, i, true)}
              list={[
                'OS',
                'CPU',
                'GPU',
                'Memory',
                'Storage',
                'DirectX',
                'Resolution',
                'Preset / Target',
                'Peripherals',
                'Others',
              ]}
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
