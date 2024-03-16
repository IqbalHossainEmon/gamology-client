import { useState } from 'react';
import useScreenWidth from '../../../../../../../../Hooks/useScreenWidth';
import ScreenShadow from '../../../../../../../../Shared/ScreenShadow/ScreenShadow';
import SearchField from '../../../../../../../../Shared/SearchField/SearchField';
import styles from './AllGamesHeader.module.css';

const AllGamesHeader = ({ setSearchText }) => {
  const [navShow, setNavShow] = useState(false);
  const screenWidth = useScreenWidth();

  return (
    <div className={styles.allGamesHeader}>
      <div className={`${navShow ? `${styles.searchShow} ` : ''}${styles.searchField}`}>
        <SearchField setNavShow={setNavShow} change={setSearchText} />
      </div>
      {screenWidth < 769 && (
        <div className={`${navShow ? `${styles.shadowShow} ` : ''}${styles.shadow}`}>
          <ScreenShadow show={navShow} />
        </div>
      )}
    </div>
  );
};
export default AllGamesHeader;
