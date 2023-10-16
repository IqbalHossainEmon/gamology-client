import { useCallback, useRef, useState } from 'react';
import FilterOption from '../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import ButtonForAddGameSection from '../../../ButtonForAddGameSection/ButtonForAddGameSection';
import SectionFieldContainer from '../SectionFieldContainer/SectionFieldContainer';
import styles from './AddGameSpecification.module.css';

export default function AddGameSpecification({ state, gameData }) {
  const [requiredLength, setRequiredLength] = useState(1);
  const [enabled, setEnabled] = useState({ enabled: false });

  const enabledRef = useRef(enabled);
  enabledRef.current = enabled.enabled;

  const handleSetValue = useCallback(() => {
    setTimeout(() => {
      if (enabledRef.current) {
        gameData.current.gameSpecifications[state.name.toLowerCase()] = {};
      } else {
        delete gameData.current.gameSpecifications[state.name.toLowerCase()];
      }
    }, 0);
  }, [gameData, state.name]);

  const handleSetEnable = useCallback(
    props => {
      setEnabled(props);
      handleSetValue();
    },
    [handleSetValue]
  );

  return (
    <div className={styles.addGameSpecification}>
      <div className={styles.switch}>
        <FilterOption
          setState={handleSetEnable}
          name="enabled"
          state={enabled.enabled}
          border
          text={state.name}
        />
      </div>
      <div className={styles.systemReqContainer} {...(!enabled.enabled && { disabled: true })}>
        <div className={styles.systemReq}>
          <h4 className={styles.type}>Minimum</h4>
          <SectionFieldContainer
            name={`${state.name.toLowerCase()}_min`}
            index={0}
            requiredLength={requiredLength}
          />
        </div>
        <div className={styles.systemReq}>
          <h4 className={styles.type}>Recommended</h4>
          <SectionFieldContainer
            name={`${state.name.toLowerCase()}_rec`}
            index={1}
            requiredLength={requiredLength}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.btnContainer}>
            <ButtonForAddGameSection
              text="Add More +"
              onClick={() => setRequiredLength(prev => prev + 1)}
            />
          </div>
          <div className={styles.btnContainer}>
            <ButtonForAddGameSection
              text="Remove one -"
              {...(requiredLength === 1 && { disabled: true })}
              onClick={() => {
                setRequiredLength(prev => prev - 1);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
