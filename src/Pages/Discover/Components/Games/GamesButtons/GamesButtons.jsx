import ArrowButton from '../../Shared/ArrowButton/ArrowButton';
import styles from './GamesButtons.module.css';

export default function GamesButton({ handleClick, btnState }) {
  return (
    <div className={styles.Buttons}>
      <ArrowButton
        btnState={btnState.next}
        handleClick={() => handleClick('next')}
        className={[styles.btn, styles.nextBtn].join(' ')}
      />
      <ArrowButton
        btnState={btnState.prev}
        handleClick={() => handleClick('prev')}
        className={[styles.btn, styles.prevBtn].join(' ')}
      />
    </div>
  );
}
