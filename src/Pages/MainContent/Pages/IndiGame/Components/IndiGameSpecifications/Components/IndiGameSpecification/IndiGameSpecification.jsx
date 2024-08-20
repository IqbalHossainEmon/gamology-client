import styles from './IndiGameSpecification.module.css';

export default function IndiGameSpecification({ spec }) {
    return (
        <div className={styles.individualGameSpecification}>
            <div className={styles.row}>
                <h5 className={`${styles.column} ${styles.header} ${styles.topHeader}`}>
                    Minimum
                </h5>

                <h5 className={`${styles.column} ${styles.header} ${styles.topHeader}`}>
                    Recommend
                </h5>
            </div>

            <div>
                {spec?.systemReq?.map(sysReq => (
                    <div
                        className={styles.row}
                        key={sysReq[0].key}
                    >
                        {sysReq.map(req => (
                            <div
                                className={styles.column}
                                key={req.id}
                            >
                                <h5 className={styles.header}>
                                    {req.key}
                                </h5>

                                <p>
                                    {req.value}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
