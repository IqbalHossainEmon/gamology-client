import DiscoverBanner from '../Components/DiscoverBanner/DiscoverBanner/DiscoverBanner';
import DiscoverGames from '../Components/DiscoverGames/DiscoverGames/DiscoverGames';
import EventGames from '../Components/EventGames/EventGames/EventGames';
import ExploreGames from '../Components/ExploreGames/ExploreGames';
import FreeGames from '../Components/FreeGames/FreeGames/FreeGames';
import styles from './Discover.module.css';

export default function Discover() {
    return (
        <div className={styles.discover}>
            <DiscoverBanner />

            <DiscoverGames headerTitle="Game on sale" />

            <DiscoverGames headerTitle="Summer Spotlight" />

            <FreeGames />

            <EventGames />

            <ExploreGames />
        </div>
    );
}
