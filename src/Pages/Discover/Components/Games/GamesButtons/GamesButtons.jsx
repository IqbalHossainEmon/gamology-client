import ArrowButton from '../../Shared/ArrowButton/ArrowButton';
import styles from './GamesButtons.module.css';

export default function GamesButton({ handleClick, btnState }) {
  return (
    <div className={styles.Buttons}>
      <ArrowButton
        btnState={btnState.next}
        name="Next Button"
        handleClick={() => handleClick('next')}
        className={[styles.btn, styles.nextBtn].join(' ')}
      />
      <ArrowButton
        btnState={btnState.prev}
        name="Previous Button"
        handleClick={() => handleClick('prev')}
        className={[styles.btn, styles.prevBtn].join(' ')}
      />
    </div>
  );
}
