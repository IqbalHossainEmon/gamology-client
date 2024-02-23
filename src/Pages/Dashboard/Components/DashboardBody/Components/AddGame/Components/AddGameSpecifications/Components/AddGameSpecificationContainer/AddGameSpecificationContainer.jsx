import { useCallback, useEffect, useRef, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import AddGameSpecification from '../AddGameSpecification/AddGameSpecification';
import styles from './AddGameSpecificationContainer.module.css';

const specs = ['Windows', 'MacOs', 'Linux'];
const AddGameSpecificationContainer = ({ gameSpecifications, errorMessages, errorChange }) => {
  const [errorShow, setErrorShow] = useState(!!errorMessages[4]);

  const errorShowRef = useRef(errorShow);
  errorShowRef.current = errorShow;

  useEffect(() => {
    if (errorChange && errorMessages[3]) {
      setErrorShow(true);
    }
  }, [errorChange, errorMessages]);

  const handleSetValue = useCallback(
    index => {
      gameSpecifications.spec[index].isActive = !gameSpecifications.spec[index].isActive;
      if (errorShowRef.current) {
        setErrorShow(false);
      }
    },
    [gameSpecifications]
  );

  return (
    <div className={styles.specsContainer}>
      {specs.map((spec, i) => (
        <div key={spec} className={styles.specs}>
          <AddGameSpecification
            gameSpecifications={gameSpecifications.spec}
            state={{ name: spec }}
            index={i}
            errorMessages={errorMessages[i]}
            errorChange={errorChange}
            handleSetValue={handleSetValue}
          />
        </div>
      ))}
      <ErrorMessage enable={errorShow} errorMessage={errorMessages[3]} />
    </div>
  );
};
export default AddGameSpecificationContainer;
