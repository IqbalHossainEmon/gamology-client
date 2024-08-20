import styles from './IndiGameSpecificationOther.module.css';

function IndiGameSpecificationOther({ others }) {
  return (<div className={styles.others}>
      <h5 className={styles.header}>
          {others.key}
      </h5>

      {others.value.map(val => (
          <p key={val}>
              {val}
          </p>
        ))}
          </div>)
}
export default IndiGameSpecificationOther;
