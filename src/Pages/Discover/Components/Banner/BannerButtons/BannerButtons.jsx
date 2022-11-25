import { useRef } from 'react';
import ArrowButton from '../../Shared/ArrowButton/ArrowButton';
import styles from './Buttons.module.css';

export default function BannerButtons({ handleClick }) {
  const timeOutRef = useRef(false);
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
        handleClick={() => handleDebuncingClick({ type: 'next' })}
        className={[styles.btn, styles.nextBtn].join(' ')}
      />
      <ArrowButton
        handleClick={() => handleDebuncingClick({ type: 'prev' })}
        className={[styles.btn, styles.prevBtn].join(' ')}
      />
    </>
  );
}
