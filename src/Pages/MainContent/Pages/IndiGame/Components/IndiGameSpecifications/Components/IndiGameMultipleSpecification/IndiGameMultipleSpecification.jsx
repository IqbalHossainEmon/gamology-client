import IndiGameSpecification from '../IndiGameSpecification/IndiGameSpecification';
import styles from './IndiGameMultipleSpecification.module.css';

export default function IndiGameMultipleSpecification({ spec = [], active }) {
    return (
        <div className={styles.individualGameMultipleSpecificationContainer}>
            <div
                className={styles.individualGameMultipleSpecification}
                style={{ translate: `-${active * 100}%` }}
            >
                {spec.map(specs => (
                    <div
                        className={styles.specs}
                        key={specs.id}
                    >
                        <IndiGameSpecification
                            others
                            spec={specs}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
