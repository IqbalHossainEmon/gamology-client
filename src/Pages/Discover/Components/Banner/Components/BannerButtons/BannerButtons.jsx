import useHandleDebouncing from '../../../../../../Hooks/useHandleDebouncing';
import ArrowButton from '../../../Shared/ArrowButton/ArrowButton';
import styles from './BannerButtons.module.css';

export default function BannerButtons({ handleClick }) {
  const handleDebouncing = useHandleDebouncing();
  return (
    <>
      <ArrowButton
        name="Next Button"
        handleClick={() => handleDebouncing(() => handleClick({ type: 'next' }))}
        className={[styles.btn, styles.nextBtn].join(' ')}
      />
      <ArrowButton
        name="Previous Button"
        handleClick={() => handleDebouncing(() => handleClick({ type: 'prev' }))}
        className={[styles.btn, styles.prevBtn].join(' ')}
      />
    </>
  );
}
