import DiscoverBanner from '../Components/DiscoverBanner/DiscoverBanner/DiscoverBanner';
import DiscoverGameCards from '../Components/DiscoverGameCards/DiscoverGameCards';
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
				<DiscoverGameCards header='Game on sale' />
				<DiscoverGameCards header='Game on sale' />
				<FreeGames />
				<DiscoverGameCards header='Summer Spotlight' />
				<DiscoverGameCards header='Summer Spotlight' />
				<MixEventGameCards />
				<DiscoverGameCards header='Summer Spotlight' />
				<DiscoverGameCards header='Summer Spotlight' />
				<EventGames />
				<DiscoverGameCards header='Most Popular' />
				<DiscoverGameCards header='Most Popular' />
				<EventGames />
			</div>
			<ExploreGames />
		</div>
	);
}
