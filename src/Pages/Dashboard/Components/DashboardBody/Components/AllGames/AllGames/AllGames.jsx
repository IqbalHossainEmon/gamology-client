import { useEffect, useState } from 'react';
import Pagination from '../../../../../../../Shared/Pagination/Pagination';
import AllGamesBody from '../Components/AllGamesBody/AllGamesBody/AllGamesBody';
import AllGamesHeader from '../Components/AllGamesHeader/AllGamesHeader';
import styles from './AllGames.module.css';

const data = [
    {
        id: 0,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 1,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: 59.99,
    },
    {
        id: 2,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: 'Free',
    },
    {
        id: 3,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 4,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 5,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 6,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 7,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 8,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 9,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 10,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 11,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 12,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 13,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 14,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 15,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 16,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 17,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 18,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 19,
        name: 'UNCHARTED™: Legacy of Thieves Collection',
        category: {
            card: 'Base game',
        },
        coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
        logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
        carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
        coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
        price: { regular: 49.99, discount: 15.99 },
    },
    {
        id: 20,
        name: 'UNCHARTED™: Legacy of Thieves Collection',
        category: {
            card: 'Base game',
        },
        coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
        logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
        carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
        coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
        price: { regular: 49.99, discount: 15.99 },
    },
    {
        id: 21,
        name: 'UNCHARTED™: Legacy of Thieves Collection',
        category: {
            card: 'Base game',
        },
        coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
        logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
        carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
        coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
        price: { regular: 49.99, discount: 15.99 },
    },
    {
        id: 22,
        category: {
            card: 'Base game',
        },
        name: "Marvel's Spider-Man Remastered",
        coverImg: '/assets/images/CarouselCoverDesktop/spiderman.png',
        logoImg: '/assets/images/wWJ85k7/spiderman-logo.png',
        carouselThumb: '/assets/images/CarouselCard/spiderman-carousel-thumb.png',
        coverMobile: '/assets/images/M19978g/spider-man-remaster-carousel-mobile.png',
        price: { regular: 59.99, discount: 29.99 },
    },
    {
        id: 23,
        name: 'UNCHARTED™: Legacy of Thieves Collection',
        category: {
            card: 'Base game',
        },
        coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
        logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
        carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
        coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
        price: { regular: 49.99, discount: 15.99 },
    },
];

const AllGames = ({ setModal }) => {
    const [searchText, setSearchText] = useState('');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState({ totalPage: 69, active: 1 });

    useEffect(() => {
        setItems(data);
    }, []);

    return (
        <div className={styles.allGames}>
            <AllGamesHeader change={setSearchText} />
            <AllGamesBody items={items} setModal={setModal} />
            <div className={styles.paginationContainer}>
                <Pagination
                    activePage={page.active}
                    totalPage={page.totalPage}
                    setActivePage={newPage => setPage(prev => ({ ...prev, active: newPage }))}
                />
            </div>
        </div>
    );
};
export default AllGames;
