import { useCallback, useEffect, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import FilterOption from '../../../../../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import ButtonForAddGameSection from '../../../ButtonForAddGameSection/ButtonForAddGameSection';
import SectionFieldTextFieldContainer from '../SectionFieldTextFieldContainer/SectionFieldTextFieldContainer';
import styles from './AddGameSpecification.module.css';

export default function AddGameSpecification({ state, gameSpecifications, index, errorMessages, errorChange, handleSetValue }) {
  const [requiredLength, setRequiredLength] = useState(1);
  const [enabled, setEnabled] = useState({ enabled: false });
  const [errorShow, setErrorShow] = useState({ min: !!errorMessages.min, rec: !!errorMessages.rec });

  const [selectedKeys, setSelectedKeys] = useState({ min: [], rec: [] });

  useEffect(() => {
    if (errorChange && errorMessages.rec) setErrorShow(prev => ({ ...prev, rec: true }));
    if (errorChange && errorMessages.min) setErrorShow(prev => ({ ...prev, min: true }));
  }, [errorChange, errorMessages]);

  const handleSetEnable = useCallback(
    props => {
      setEnabled(props);
      handleSetValue(index);
    },
    [handleSetValue, index]
  );

  const handleHideErrorShow = childIndex => {
    if (errorShow.rec && childIndex) setErrorShow(prev => ({ ...prev, rec: false }));
    if (errorShow.min && !childIndex) setErrorShow(prev => ({ ...prev, min: false }));
  };

  const handleSetState = (value, i, childIndex, isKey) => {
    if (isKey) {
      gameSpecifications[index].systemReq[i][childIndex].key = value;
      setSelectedKeys(prev => {
        const newSelectedKeys = [...prev[childIndex ? 'rec' : 'min']];
        newSelectedKeys[i] = value;
        return { ...prev, [childIndex ? 'rec' : 'min']: newSelectedKeys };
      });
      handleHideErrorShow(childIndex);
    } else gameSpecifications[index].systemReq[i][childIndex].value = value;
  };

  return (
    <div className={styles.addGameSpecification}>
      <div className={styles.switch}>
        <FilterOption setState={handleSetEnable} name="enabled" state={enabled.enabled} border text={state.name} />
      </div>
      <div className={styles.systemReqContainer} {...(!enabled.enabled && { disabled: true, tabIndex: '-1' })}>
        <div className={styles.systemReq}>
          <h4 className={styles.type}>Minimum</h4>
          <SectionFieldTextFieldContainer
            enabled={enabled.enabled}
            parentErrorShow={errorShow.min}
            selectedKeys={selectedKeys.min}
            name={`${state.name.toLowerCase()}_min`}
            parentIndex={index}
            index={0}
            handleSetState={handleSetState}
            requiredLength={requiredLength}
            errorMessage={errorMessages.req?.min}
            errorChange={errorChange}
            setHideParentErrorShow={() => {
              if (errorShow.min) setErrorShow(prev => ({ ...prev, min: false }));
            }}
          />
          <ErrorMessage enable={errorShow.min} errorMessage={errorMessages.min} />
        </div>
        <div className={styles.systemReq}>
          <h4 className={styles.type}>Recommended</h4>
          <SectionFieldTextFieldContainer
            enabled={enabled.enabled}
            parentErrorShow={errorShow.rec}
            selectedKeys={selectedKeys.rec}
            name={`${state.name.toLowerCase()}_rec`}
            parentIndex={index}
            index={1}
            handleSetState={handleSetState}
            requiredLength={requiredLength}
            errorMessage={errorMessages.req?.rec}
            errorChange={errorChange}
            setHideParentErrorShow={() => {
              if (errorShow.rec) setErrorShow(prev => ({ ...prev, rec: false }));
            }}
          />
          <ErrorMessage enable={errorShow.rec} errorMessage={errorMessages.rec} />
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.btnContainer}>
            <ButtonForAddGameSection
              text="Add More +"
              {...(requiredLength === 10 && { disabled: true })}
              {...(enabled.enabled || { tabIndexOff: true })}
              onClick={() => {
                setRequiredLength(prev => prev + 1);
                if (errorShow.rec) setErrorShow({ min: false, rec: false });
                gameSpecifications[index].systemReq.push([
                  { key: '', value: '' },
                  { key: '', value: '' },
                ]);
              }}
            />
          </div>
          <div className={styles.btnContainer}>
            <ButtonForAddGameSection
              text="Remove one -"
              {...(requiredLength === 1 && { disabled: true })}
              onClick={() => {
                setRequiredLength(prev => prev - 1);
                const pop = gameSpecifications[index].systemReq.pop();
                if (pop[0].key === selectedKeys.min[selectedKeys.min.length - 1]) {
                  setSelectedKeys(prev => ({ ...prev, min: prev.min.slice(0, -1) }));
                } else if (pop[0].key === selectedKeys.rec[selectedKeys.rec.length - 1]) {
                  setSelectedKeys(prev => ({ ...prev, rec: prev.rec.slice(0, -1) }));
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
