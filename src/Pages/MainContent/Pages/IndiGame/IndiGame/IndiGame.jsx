import IndiGameDetails from '../Components/IndiGameDetails/IndiGameDetails/IndiGameDetails';
import IndiGameReviewSection from '../Components/IndiGameReviewSection/IndiGameReviewSection/IndiGameReviewSection';
import styles from './IndiGame.module.css';

export default function IndiGame() {
  return (
    <section className={styles.individualGame}>
      <IndiGameDetails />
      <div className={styles.reviewContainer}>
        <IndiGameReviewSection />
      </div>
    </section>
  );
}
