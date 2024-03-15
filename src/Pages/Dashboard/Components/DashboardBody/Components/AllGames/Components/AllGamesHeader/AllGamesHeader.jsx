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
      <SearchField setNavShow={setNavShow} change={setSearchText} />
      {screenWidth < 769 && <ScreenShadow show={navShow} />}
    </div>
  );
};
export default AllGamesHeader;
