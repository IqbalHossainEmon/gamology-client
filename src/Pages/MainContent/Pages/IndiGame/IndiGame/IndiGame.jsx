import IndiGameDetails from '../Components/IndiGameDetails/IndiGameDetails/IndiGameDetails';
import styles from './IndiGame.module.css';

export default function IndiGame() {
  return (
    <section className={styles.individualGame}>
      <IndiGameDetails />
    </section>
  );
}
