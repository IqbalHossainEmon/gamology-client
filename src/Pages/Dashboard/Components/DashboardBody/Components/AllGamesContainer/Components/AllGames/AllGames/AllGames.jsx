import { useEffect, useState } from 'react';
import Pagination from '../../../../../../../../../Shared/Pagination/Pagination/Pagination';
import AllGamesBody from '../Components/AllGamesBody/AllGamesBody/AllGamesBody';
import AllGamesHeader from '../Components/AllGamesHeader/AllGamesHeader';
import styles from './AllGames.module.css';

function AllGames({ setModal }) {
    const [searchText, setSearchText] = useState(''),
     [items, setItems] = useState([]),
     [page, setPage] = useState({ totalPage: 69, active: 1 });

    useEffect(() => {
        setItems(data);
    }, []);

    useEffect(() => {
        if (searchText !== '') {
            console.log(searchText);
        }
    }, [searchText]);

    return (
        <div className={styles.allGames}>
            <AllGamesHeader setSearchText={setSearchText} />

            <AllGamesBody
                items={items}
                setModal={setModal}
            />

            <div className={styles.paginationContainer}>
                <Pagination
                    activePage={page.active}
                    setActivePage={newPage => setPage(prev => ({ ...prev, active: newPage }))}
                    totalPage={page.totalPage}
                />
            </div>
        </div>
    );
}
export default AllGames;
