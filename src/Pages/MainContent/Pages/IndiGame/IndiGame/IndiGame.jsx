import { useRef } from 'react';
import IndiGameDetailAside from '../Components/IndiGameDetailAside/IndiGameDetailAside/IndiGameDetailAside';
import IndiGameDetails from '../Components/IndiGameDetails/IndiGameDetails/IndiGameDetails';
import styles from './IndiGame.module.css';

export default function IndiGame() {
  const reviewContainerRef = useRef(null);
  return (
    <section className={styles.individualGame}>
      <IndiGameDetails reviewContainerRef={reviewContainerRef} />
      <IndiGameDetailAside reviewContainerRef={reviewContainerRef} />
    </section>
  );
}
