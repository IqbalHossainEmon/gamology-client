import { useEffect, useState } from 'react';
import ErrorMessage from '../../../../../../Shared/ErrorMessage/ErrorMessage';
import AddGameSpecification from '../AddGameSpecification/AddGameSpecification';
import styles from './AddGameSpecificationContainer.module.css';

const AddGameSpecificationContainer = ({
  specs,
  gameSpecifications,
  errorMessages,
  errorChange,
}) => {
  const [errorShow, setErrorShow] = useState(!!errorMessages[4]);

  useEffect(() => {
    if (errorChange && errorMessages[4]) {
      setErrorShow(true);
    }
  }, [errorChange, errorMessages]);

  return (
    <div className={styles.specsContainer}>
      {specs.map((spec, i) => (
        <div key={spec} className={styles.specs}>
          <AddGameSpecification
            gameSpecifications={gameSpecifications}
            state={{ name: spec }}
            index={i}
            errorMessages={errorMessages[i]}
            errorChange={errorChange}
          />
        </div>
      ))}
      <ErrorMessage enable={errorShow} errorMessage={errorMessages[4]} />
    </div>
  );
};
export default AddGameSpecificationContainer;
