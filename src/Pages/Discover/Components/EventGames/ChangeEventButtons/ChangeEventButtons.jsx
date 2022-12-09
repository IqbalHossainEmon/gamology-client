import styles from './ChangeEventButtons.module.css';

export default function ChangeEventButtons({ setCardPosition, cardPosition }) {
  return (
    <div className={styles.ChangeEventButtons}>
      <div>
        <button
          id={cardPosition === 0 ? styles.active : ''}
          type="button"
          onClick={() => setCardPosition(0)}
          className={[styles.button1, styles.button].join(' ')}
        />
        <button
          id={cardPosition === 1 ? styles.active : ''}
          type="button"
          onClick={() => setCardPosition(1)}
          className={[styles.button2, styles.button].join(' ')}
        />
        <button
          id={cardPosition === 2 ? styles.active : ''}
          type="button"
          onClick={() => setCardPosition(2)}
          className={[styles.button3, styles.button].join(' ')}
        />
      </div>
    </div>
  );
}
