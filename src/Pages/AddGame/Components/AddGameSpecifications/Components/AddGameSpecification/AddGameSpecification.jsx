import { useCallback, useEffect, useState } from 'react';
import ErrorMessage from '../../../../../../Shared/ErrorMessage/ErrorMessage';
import FilterOption from '../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import ButtonForAddGameSection from '../../../ButtonForAddGameSection/ButtonForAddGameSection';
import SectionFieldContainer from '../SectionFieldContainer/SectionFieldContainer';
import styles from './AddGameSpecification.module.css';

export default function AddGameSpecification({
  state,
  gameSpecifications,
  index,
  errorMessages,
  errorChange,
  handleSetValue,
}) {
  const [requiredLength, setRequiredLength] = useState(1);
  const [enabled, setEnabled] = useState({ enabled: false });
  const [errorShow, setErrorShow] = useState(!!errorMessages);

  useEffect(() => {
    if (errorChange && errorMessages) setErrorShow(true);
  }, [errorChange, errorMessages]);

  const handleSetEnable = useCallback(
    props => {
      setEnabled(props);
      handleSetValue(index);
    },
    [handleSetValue, index]
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
            parentIndex={index}
            index={0}
            gameSpecifications={gameSpecifications}
            requiredLength={requiredLength}
          />
        </div>
        <div className={styles.systemReq}>
          <h4 className={styles.type}>Recommended</h4>
          <SectionFieldContainer
            name={`${state.name.toLowerCase()}_rec`}
            parentIndex={index}
            index={1}
            gameSpecifications={gameSpecifications}
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
                gameSpecifications[index].systemReq[
                  gameSpecifications[index].systemReq.length - 1
                ].pop();
              }}
            />
          </div>
        </div>
      </div>
      <ErrorMessage enable={errorShow} errorMessage={errorMessages} />
    </div>
  );
}
