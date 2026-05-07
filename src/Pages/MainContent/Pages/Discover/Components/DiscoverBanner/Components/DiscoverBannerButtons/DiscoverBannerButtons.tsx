import ArrowButton from '../../../../../../../../Shared/ArrowButton/ArrowButton';
import useHandleDebouncing from '../../../../../../../../Utils/Hooks/useHandleDebouncing';

import styles from './DiscoverBannerButtons.module.css';

type Props = {
  handleClick: (action: { type: 'next' | 'prev' }) => void;
};

export default function DiscoverBannerButtons({ handleClick }: Props) {
  const handleDebouncing = useHandleDebouncing(400);
  return (
    <>
      <ArrowButton
        className={[styles.btn, styles.nextBtn].join(' ')}
        handleClick={() => handleDebouncing(() => handleClick({ type: 'next' }))}
        name='Next Button'
      />
      <ArrowButton
        className={[styles.btn, styles.prevBtn].join(' ')}
        handleClick={() => handleDebouncing(() => handleClick({ type: 'prev' }))}
        name='Previous Button'
      />
    </>
  );
}
