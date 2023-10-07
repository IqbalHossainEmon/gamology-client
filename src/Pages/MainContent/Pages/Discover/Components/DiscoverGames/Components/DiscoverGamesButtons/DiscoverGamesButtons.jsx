import ArrowButton from '../../../../../../../../Shared/ArrowButton/ArrowButton';
import styles from './DiscoverGamesButtons.module.css';

export default function DiscoverGamesButton({
  handleClick,
  cardActive,
  length,
}) {
  return (
    <div className={styles.Buttons}>
      <ArrowButton
        enable={cardActive === 0}
        name="Previous Button"
        handleClick={() => handleClick('prev')}
        className={[styles.btn, styles.nextBtn].join(' ')}
      />
      <ArrowButton
        enable={length === -cardActive}
        name="Next Button"
        handleClick={() => handleClick('next')}
        className={[styles.btn, styles.prevBtn].join(' ')}
      />
    </div>
  );
}
