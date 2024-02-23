import { useEffect, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../../../../../../Shared/TextField/TextField';
import styles from './SelectionFieldTextField.module.css';

const SelectionFieldTextField = ({
  parentIndex,
  name,
  length,
  i,
  index,
  handleSetState,
  listArr,
  selectedKeys,
  errorMessage,
  parentErrorShow,
  errorChange,
  setHideParentErrorShow,
  enabled,
}) => {
  const [errorShow, setErrorShow] = useState(!!errorMessage);

  useEffect(() => {
    if (errorChange && errorMessage) setErrorShow(true);
  }, [errorChange, errorMessage]);

  const handleHideErrorShow = () => {
    if (errorShow) setErrorShow(false);
  };

  return (
    <>
      <div className={styles.specsContainer}>
        <div className={styles.selectionField}>
          <SelectionField
            enabled={enabled}
            onFocusClick={() => setHideParentErrorShow()}
            name="Key Type"
            placeholder="Required"
            htmlFor={`${parentIndex}${name}${length}${i}${index}`}
            setState={value => {
              handleSetState(value, i, index, true);
            }}
            list={listArr.filter(la => !selectedKeys.includes(la))}
          />
        </div>
        <div className={styles.textField}>
          <TextField
            enabled={enabled}
            onFocusClick={() => handleHideErrorShow()}
            setState={value => {
              handleSetState(value, i, index);
            }}
            field="input"
            htmlFor={`${name}_${length}`}
            placeholder="Required Specs"
          />
        </div>
      </div>
      <ErrorMessage enable={!parentErrorShow && errorShow} errorMessage={errorMessage} />
    </>
  );
};
export default SelectionFieldTextField;
