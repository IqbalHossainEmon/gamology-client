import { useRef } from 'react';
import IndividualGameDetailAside from '../Components/IndividualGameDetailAside/IndividualGameDetailAside/IndividualGameDetailAside';
import IndividualGameDetails from '../Components/IndividualGameDetails/IndividualGameDetails/IndividualGameDetails';
import styles from './IndividualGame.module.css';

export default function IndividualGame() {
  const reviewContainerRef = useRef(null);
  return (
    <section className={styles.individualGame}>
      <IndividualGameDetails reviewContainerRef={reviewContainerRef} />
      <IndividualGameDetailAside reviewContainerRef={reviewContainerRef} />
    </section>
  );
}
