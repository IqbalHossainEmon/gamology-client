import styles from './IndiGameSpecification.module.css';

export default function IndiGameSpecification({ spec }) {
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
    </div>
  );
}
