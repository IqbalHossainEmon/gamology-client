import { useEffect, useReducer } from 'react';
import IndiGameBannerCards from '../Components/IndiGameBannerCards/IndiGameBannerCards';
import IndiGameBannerItems from '../Components/IndiGameBannerItems/IndiGameBannerItems';
import useIndiGameBannerLogics from '../useIndiGameBannerLogics/useIndiGameBannerLogics';
import styles from './IndiGameBanner.module.css';

const items = [
    {
        id: 0,
        type: 'video',
        cover: `/assets/images/IndiGameBanner/spider-carousel-v-1.mp4`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-1.avif`,
    },
    {
        id: 1,
        type: 'video',
        cover: `/assets/images/IndiGameBanner/spider-carousel-v-2.mp4`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-2.avif`,
    },
    {
        id: 2,
        type: 'video',
        cover: `/assets/images/IndiGameBanner/spider-carousel-v-3.mp4`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-3.avif`,
    },
    {
        id: 3,
        type: 'photo',
        cover: `/assets/images/IndiGameBanner/spider-carousel-1.jpg`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-4.avif`,
    },
    {
        id: 4,
        type: 'photo',
        cover: `/assets/images/IndiGameBanner/spider-carousel-2.jpg`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-5.avif`,
    },
    {
        id: 5,
        type: 'photo',
        cover: `/assets/images/IndiGameBanner/spider-carousel-3.jpg`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-6.avif`,
    },
    {
        id: 6,
        type: 'photo',
        cover: `/assets/images/IndiGameBanner/spider-carousel-4.jpg`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-7.avif`,
    },
    {
        id: 8,
        type: 'photo',
        cover: `/assets/images/IndiGameBanner/spider-carousel-6.jpg`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-9.avif`,
    },
    {
        id: 7,
        type: 'photo',
        cover: `/assets/images/IndiGameBanner/spider-carousel-5.jpg`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-8.avif`,
    },
    {
        id: 9,
        type: 'photo',
        cover: `/assets/images/IndiGameBanner/spider-carousel-7.jpg`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-10.avif`,
    },
    {
        id: 10,
        type: 'photo',
        cover: `/assets/images/IndiGameBanner/spider-carousel-8.jpg`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-11.avif`,
    },
    {
        id: 11,
        type: 'photo',
        cover: `/assets/images/IndiGameBanner/spider-carousel-9.jpg`,
        thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-12.avif`,
    },
];

export default function IndiGameBanner() {
    const { reducer, initialState, timerFunction } = useIndiGameBannerLogics(),

     [{ data, active, coverTransition, cardActive, cardsOnDeck, thumbTransition }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        dispatch({ type: 'fetch', data: items });
    }, []);

    return (
        <section className={styles.banner}>
            <IndiGameBannerItems
                active={active}
                dispatch={dispatch}
                items={data}
                timerFunction={timerFunction}
                transition={coverTransition}
            />

            {data.length > 1 && (
                <IndiGameBannerCards
                    active={active}
                    cardActive={cardActive}
                    cardsOnDeck={cardsOnDeck}
                    dispatch={dispatch}
                    items={data}
                    thumbTransition={thumbTransition}
                    timerFunction={timerFunction}
                />
            )}
        </section>
    );
}
