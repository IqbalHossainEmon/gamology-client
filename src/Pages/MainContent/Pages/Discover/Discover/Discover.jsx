import DiscoverBanner from '../Components/DiscoverBanner/DiscoverBanner/DiscoverBanner';
import DiscoverGames from '../Components/DiscoverGames/DiscoverGames';
import EventGames from '../Components/EventGames/EventGames/EventGames';
import ExploreGames from '../Components/ExploreGames/ExploreGames';
import FreeGames from '../Components/FreeGames/FreeGames/FreeGames';
import styles from './Discover.module.css';

export default function Discover() {
	return (
		<div className={styles.discover}>
			<DiscoverBanner />
			<DiscoverGames header='Game on sale' />
			<DiscoverGames header='Summer Spotlight' />
			<FreeGames />
			<EventGames />
			<ExploreGames />
		</div>
	);
}
