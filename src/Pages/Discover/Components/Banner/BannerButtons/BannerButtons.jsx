import { useRef } from 'react';
import ArrowButton from '../../Shared/ArrowButton/ArrowButton';
import styles from './Buttons.module.css';

export default function BannerButtons({ handleClick }) {
  const timeOutRef = useRef(false);
  // handle multiple click.
  const handleDebuncingClick = (type) => {
    if (!timeOutRef.current) {
      handleClick(type);
      timeOutRef.current = true;
      setTimeout(() => {
        timeOutRef.current = false;
      }, 400);
    }
  };
  return (
    <>
      <ArrowButton
        name="Next Button"
        handleClick={() => handleDebuncingClick({ type: 'next' })}
        className={[styles.btn, styles.nextBtn].join(' ')}
      />
      <ArrowButton
        name="Previous Button"
        handleClick={() => handleDebuncingClick({ type: 'prev' })}
        className={[styles.btn, styles.prevBtn].join(' ')}
      />
    </>
  );
}
