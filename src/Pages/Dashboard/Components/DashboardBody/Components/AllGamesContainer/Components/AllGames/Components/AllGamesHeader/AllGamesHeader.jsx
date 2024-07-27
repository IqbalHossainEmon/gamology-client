import { useCallback, useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../../../../../../../../Hooks/useScreenWidth';
import ScreenShadow from '../../../../../../../../../../Shared/ScreenShadow/ScreenShadow';
import SearchField from '../../../../../../../../../../Shared/SearchField/SearchField';
import styles from './AllGamesHeader.module.css';

const AllGamesHeader = ({ setSearchText }) => {
    const [search, setSearch] = useState('');
    const [navShow, setNavShow] = useState(false);
    const screenWidth = useScreenWidth();

    const timerId = useRef(null);

    const searchRef = useRef(search);
    searchRef.current = search;

    useEffect(() => {
        if (timerId) {
            clearTimeout(timerId.current);
            timerId.current = null;
        }

        timerId.current = setTimeout(() => {
            timerId.current = null;
            if (search !== '') {
                console.log(search);
            }
        }, 30);
    }, [search]);

    const handleChange = useCallback(
        prop => {
            setNavShow(prop);
            setSearchText(searchRef.current);
        },
        [setSearchText]
    );

    return (
        <div className={styles.allGamesHeader}>
            <h2 className={styles.headerText}>All Games</h2>
            <div className={styles.searchFieldContainer}>
                <div className={`${navShow ? `${styles.searchShow} ` : ''}${styles.searchField}`}>
                    <SearchField setNavShow={handleChange} setChangedValue={setSearch} />
                </div>
            </div>
            {screenWidth < 769 && <ScreenShadow show={navShow} zIndex={3} />}
        </div>
    );
};
export default AllGamesHeader;
