import Button from '../Button/Button';
import styles from './Buttons.module.css';

export default function Buttons({ handleClick }) {
  return (
    <div>
      <Button
        handleClick={() => handleClick({ type: 'next' })}
        className={[styles.btn, styles.nextBtn].join(' ')}
      />
      <Button
        handleClick={() => handleClick({ type: 'prev' })}
        className={[styles.btn, styles.prevBtn].join(' ')}
      />
    </div>
  );
}
