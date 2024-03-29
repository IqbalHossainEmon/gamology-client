import useHandleDebouncing from '../../../../../../../../Hooks/useHandleDebouncing';
import ArrowButton from '../../../../../../../../Shared/ArrowButton/ArrowButton';
import styles from './DiscoverBannerButtons.module.css';

export default function DiscoverBannerButtons({ handleClick }) {
    const handleDebouncing = useHandleDebouncing(400);
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
