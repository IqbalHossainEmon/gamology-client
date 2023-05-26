import IndividualGameDetailAside from '../Components/IndividualGameDetailAside/IndividualGameDetailAside/IndividualGameDetailAside';
import IndividualGameDetails from '../Components/IndividualGameDetails/IndividualGameDetails/IndividualGameDetails';
import styles from './IndividualGame.module.css';

export default function IndividualGame() {
  return (
    <section className={styles.individualGame}>
      <IndividualGameDetails />
      <IndividualGameDetailAside />
    </section>
  );
}
