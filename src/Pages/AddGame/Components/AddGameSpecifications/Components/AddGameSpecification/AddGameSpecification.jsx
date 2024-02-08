import { useCallback, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../Shared/ErrorMessage/ErrorMessage';
import FilterOption from '../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import ButtonForAddGameSection from '../../../ButtonForAddGameSection/ButtonForAddGameSection';
import SectionFieldContainer from '../SectionFieldContainer/SectionFieldContainer';
import styles from './AddGameSpecification.module.css';

export default function AddGameSpecification({ state, gameSpecifications }) {
  const [requiredLength, setRequiredLength] = useState(1);
  const [enabled, setEnabled] = useState({ enabled: false });

  const enabledRef = useRef(enabled);
  enabledRef.current = enabled.enabled;

  const specificationRef = useRef([]);

  const handleSetValue = useCallback(() => {
    setTimeout(() => {
      if (enabledRef.current) {
        enabledRef.index = gameSpecifications.spec.length;

        gameSpecifications.spec[enabledRef.index] = {};
        gameSpecifications.spec[enabledRef.index].systemReq = specificationRef.current;

        gameSpecifications.spec[enabledRef.index].for = state.name;
      } else {
        delete gameSpecifications.spec[enabledRef.index];
      }
    }, 0);
  }, [gameSpecifications, state]);

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
      <ErrorMessage errorMessage={"There's a problem with the specifications"} />
    </div>
  );
}
