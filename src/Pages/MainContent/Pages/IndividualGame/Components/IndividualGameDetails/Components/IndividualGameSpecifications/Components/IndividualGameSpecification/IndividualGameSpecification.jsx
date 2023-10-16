import styles from './IndividualGameSpecification.module.css';

export default function IndividualGameSpecification({ spec }) {
  return (
    <div className={styles.individualGameSpecification}>
      <div className={styles.row}>
        <h5 className={`${styles.column} ${styles.header} ${styles.topHeader}`}>Minimum</h5>
        <h5 className={`${styles.column} ${styles.header} ${styles.topHeader}`}>Recommend</h5>
      </div>
      <div>
        {spec?.systemReq?.map(sysReq => (
          <div key={sysReq[0].key} className={styles.row}>
            {sysReq.map(req => (
              <div key={req.id} className={styles.column}>
                <h5 className={styles.header}>{req.key}</h5>
                <p>{req.value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {spec?.others && (
        <div className={styles.others}>
          <h5 className={styles.header}>{spec.others?.key}</h5>
          {Array.isArray(spec.others?.value) ? (
            spec.others?.value.map(val => <p key={val}>{val}</p>)
          ) : (
            <p>{spec.others?.value}</p>
          )}
        </div>
      )}
    </div>
  );
}
