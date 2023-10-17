import { useCallback, useRef, useState } from 'react';
import FilterOption from '../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import ButtonForAddGameSection from '../../../ButtonForAddGameSection/ButtonForAddGameSection';
import SectionFieldContainer from '../SectionFieldContainer/SectionFieldContainer';
import styles from './AddGameSpecification.module.css';

export default function AddGameSpecification({ state, gameData, index }) {
  const [requiredLength, setRequiredLength] = useState(1);
  const [enabled, setEnabled] = useState({ enabled: false });

  const enabledRef = useRef(enabled);
  enabledRef.current = enabled.enabled;

  const specificationRef = useRef([]);

  const handleSetValue = useCallback(() => {
    setTimeout(() => {
      if (enabledRef.current) {
        gameData.current.gameSpecifications.spec[index] = {};

        gameData.current.gameSpecifications.spec[index].systemReq = specificationRef.current;

        gameData.current.gameSpecifications.spec[index].for = state.name;
      } else {
        delete gameData.current.gameSpecifications.spec[index];
      }
    }, 0);
  }, [gameData, index, state]);

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
            specificationRef={specificationRef}
            requiredLength={requiredLength}
          />
        </div>
        <div className={styles.systemReq}>
          <h4 className={styles.type}>Recommended</h4>
          <SectionFieldContainer
            name={`${state.name.toLowerCase()}_rec`}
            index={1}
            specificationRef={specificationRef}
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
