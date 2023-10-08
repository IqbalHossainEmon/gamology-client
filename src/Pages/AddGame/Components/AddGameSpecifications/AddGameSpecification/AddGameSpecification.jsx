import { useState } from 'react';
import FilterOption from '../../../../../Shared/FilterOption/FilterOption/FilterOption';
import SelectionField from '../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../Shared/TextField/TextField';
import ButtonForAddGameSection from '../../ButtonForAddGameSection/ButtonForAddGameSection';
import styles from './AddGameSpecification.module.css';

export default function AddGameSpecification({ state }) {
  const [requiredLength, setRequiredLength] = useState(1);

  return (
    <div className={styles.addGameSpecification}>
      <div className={styles.switch}>
        <FilterOption text={state.name} />
      </div>
      <div className={styles.systemReq}>
        <h4 className={styles.type}>Minimum</h4>
        {[...Array(requiredLength).keys()].map((length) => (
          <div key={length} className={styles.specsContainer}>
            <div className={styles.selectionField}>
              <SelectionField
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
                ]}
              />
            </div>
            <div className={styles.textField}>
              <TextField field="input" empty={0} placeholder="Required Specs" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.systemReq}>
        <h4 className={styles.type}>Recommended</h4>
        {[...Array(requiredLength).keys()].map((length) => (
          <div key={length} className={styles.specsContainer}>
            <div className={styles.selectionField}>
              <SelectionField
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
                ]}
              />
            </div>
            <div className={styles.textField}>
              <TextField field="input" empty={0} placeholder="Required Specs" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.btnContainer}>
        <ButtonForAddGameSection
          text="Add More +"
          onClick={() => setRequiredLength((prev) => prev + 1)}
        />
      </div>
    </div>
  );
}
