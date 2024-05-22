import DiscoverBannerItemCardShadow from '../DiscoverBannerItemCardShadow/DiscoverBannerItemCardShadow';
import styles from './DiscoverBannerItemCard.module.css';

export default function DiscoverBannerItemCard({ banner, handleClick, cardsPosition, isPause }) {
    const { carouselThumb, id, name } = banner;

    // this function takes card positions in the screen and returns a object where cards position styles and function is added as element
    const handleCardPosition = num => {
        switch (num) {
            case 0:
                return styles.first;
            case 1:
                return styles.two;
            case 2:
                return styles.three;
            case 3:
                return styles.four;
            case 4:
                return styles.five;
            default:
                return '';
        }
    };

    const handleOnClickParam = num => {
        if (num > 2) {
            return 'prev';
        }
        if (num < 3) {
            return 'next';
        }

        return '';
    };

    const handleCardClick = () => {
        if (cardsPosition[id] === 2 || cardsPosition[id] === 3) {
            handleClick({ type: handleOnClickParam(cardsPosition[id]) });
            setTimeout(() => {
                handleClick({ type: handleOnClickParam(cardsPosition[id]) });
            }, 500);
        } else {
            handleClick({ type: handleOnClickParam(cardsPosition[id]) });
        }
    };

    return (
        <li className={`${styles.cards} hover-shadow`} id={handleCardPosition(cardsPosition[id])}>
            <button type="button" {...(cardsPosition[id] !== 0 && { onClick: handleCardClick })}>
                <img src={carouselThumb} alt={`${name} card-${id}`} />
            </button>
            <div className={styles.cardNameContainer}>
                <div className={styles.cardName}>
                    <p className={styles.cardNameText}>{name}</p>
                    {cardsPosition[id] === 0 && <DiscoverBannerItemCardShadow isPause={isPause} />}
                </div>
            </div>
        </li>
    );
}
