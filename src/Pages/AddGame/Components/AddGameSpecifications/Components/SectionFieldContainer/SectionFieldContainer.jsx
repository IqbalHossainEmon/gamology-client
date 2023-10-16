import SelectionField from '../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../Shared/TextField/TextField';
import styles from './SectionFieldContainer.module.css';

export default function SectionFieldContainer({ requiredLength, index, name }) {
  return (
    <>
      {[...Array(requiredLength).keys()].map(length => (
        <div key={length} className={styles.specsContainer}>
          <div className={styles.selectionField}>
            <SelectionField
              placeholder={`${name}_system_req_`}
              htmlFor={`${length}${index}`}
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
            <TextField field="input" htmlFor={`${name}_${length}`} placeholder="Required Specs" />
          </div>
        </div>
      ))}
    </>
  );
}
