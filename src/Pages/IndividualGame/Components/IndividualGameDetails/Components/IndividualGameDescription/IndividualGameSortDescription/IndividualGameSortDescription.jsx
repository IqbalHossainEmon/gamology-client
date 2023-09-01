import styles from './IndividualGameSortDescription.module.css';

export default function IndividualGameSortDescription({ desc }) {
  return <p className={styles.individualGameSortDescription}>{desc}</p>;
}
