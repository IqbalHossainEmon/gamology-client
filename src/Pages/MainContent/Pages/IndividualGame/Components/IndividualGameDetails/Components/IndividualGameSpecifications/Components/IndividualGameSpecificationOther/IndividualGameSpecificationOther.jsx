import styles from './IndividualGameSpecificationOther.module.css';

const IndividualGameSpecificationOther = ({ others }) => (
  <div className={styles.others}>
    <h5 className={styles.header}>{others.key}</h5>
    {Array.isArray(others.value) ? (
      others.value.map(val => <p key={val}>{val}</p>)
    ) : (
      <p>{others.value}</p>
    )}
  </div>
);
export default IndividualGameSpecificationOther;
