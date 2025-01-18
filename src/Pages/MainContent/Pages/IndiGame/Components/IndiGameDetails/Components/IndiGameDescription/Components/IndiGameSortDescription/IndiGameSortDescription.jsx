import styles from './IndiGameSortDescription.module.css';

export default function IndiGameSortDescription({ desc }) {
	return desc ? <p className={styles.individualGameSortDescription}>{desc}</p> : null;
}
