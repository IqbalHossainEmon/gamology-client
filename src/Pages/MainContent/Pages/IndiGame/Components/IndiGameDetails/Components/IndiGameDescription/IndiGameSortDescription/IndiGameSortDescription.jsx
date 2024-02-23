import styles from './IndiGameSortDescription.module.css';

export default function IndiGameSortDescription({ desc }) {
  return <p className={styles.individualGameSortDescription}>{desc}</p>;
}
