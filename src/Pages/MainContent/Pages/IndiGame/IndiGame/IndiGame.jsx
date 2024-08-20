import IndiGameDetails from '../Components/IndiGameDetails/IndiGameDetails/IndiGameDetails';
import IndiGameReviewSection from '../Components/IndiGameReviewSection/IndiGameReviewSection/IndiGameReviewSection';
import IndiGameSpecifications from '../Components/IndiGameSpecifications/IndiGameSpecifications/IndiGameSpecifications';
import styles from './IndiGame.module.css';

export default function IndiGame() {
    return (
        <section className={styles.individualGame}>
            <IndiGameDetails />

            <div className={styles.reviewContainer}>
                <IndiGameSpecifications />

                <IndiGameReviewSection />
            </div>
        </section>
    );
}
