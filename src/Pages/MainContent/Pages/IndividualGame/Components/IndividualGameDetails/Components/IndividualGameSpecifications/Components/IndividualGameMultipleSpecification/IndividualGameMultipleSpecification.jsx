import IndividualGameSpecification from '../IndividualGameSpecification/IndividualGameSpecification';
import styles from './IndividualGameMultipleSpecification.module.css';

export default function IndividualGameMultipleSpecification({ spec = [], active }) {
  return (
    <div className={styles.individualGameMultipleSpecificationContainer}>
      <div
        className={styles.individualGameMultipleSpecification}
        style={{ translate: `-${active * 100}%` }}
      >
        {spec.map(specs => (
          <div className={styles.specs} key={specs.id}>
            <IndividualGameSpecification spec={specs} others />
          </div>
        ))}
      </div>
    </div>
  );
}
