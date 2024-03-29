import styles from './IndiGameSpecificationOther.module.css';

const IndiGameSpecificationOther = ({ others }) => (
    <div className={styles.others}>
        <h5 className={styles.header}>{others.key}</h5>
        {others.value.map(val => (
            <p key={val}>{val}</p>
        ))}
    </div>
);
export default IndiGameSpecificationOther;
