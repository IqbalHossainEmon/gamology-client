import DiscoverBanner from '../Components/DiscoverBanner/DiscoverBanner/DiscoverBanner';
import DiscoverGames from '../Components/DiscoverGames/DiscoverGames';
import EventGames from '../Components/EventGames/EventGames/EventGames';
import ExploreGames from '../Components/ExploreGames/ExploreGames';
import FreeGames from '../Components/FreeGames/FreeGames/FreeGames';
import MixEventGameCards from '../Components/MixEventGameCards/MixEventGameCards/MixEventGameCards';
import styles from './Discover.module.css';

export default function Discover() {
	return (
		<div className={styles.discover}>
			<DiscoverBanner />
			<div className={styles.content}>
				<DiscoverGames header='Game on sale' />
				<FreeGames />
				<DiscoverGames header='Summer Spotlight' />
				<MixEventGameCards />
				<DiscoverGames header='Summer Spotlight' />
				<EventGames />
				<DiscoverGames header='Most Popular' />
				<EventGames />
			</div>
			<ExploreGames />
		</div>
	);
}
