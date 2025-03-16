import DiscoverAdaptiveGameCards from '../Components/DiscoverAdaptiveGameCards/DiscoverAdaptiveGameCards';
import DiscoverBanner from '../Components/DiscoverBanner/DiscoverBanner/DiscoverBanner';
import DiscoverGameCards from '../Components/DiscoverGameCards/DiscoverGameCards';
import DiscoverGameShowcase from '../Components/DiscoverGameShowCase/DiscoverGameShowCase';
import ExploreGames from '../Components/ExploreGames/ExploreGames';
import FreeGames from '../Components/FreeGames/FreeGames/FreeGames';
import styles from './Discover.module.css';

export default function Discover() {
	return (
		<div className={styles.discover}>
			<DiscoverBanner />
			<div className={styles.content}>
				<DiscoverGameCards header='Game on sale' />
				<FreeGames />
				<DiscoverGameCards header='Summer Spotlight' />
				<DiscoverAdaptiveGameCards />
				<DiscoverGameCards header='Summer Spotlight' />
				<DiscoverGameShowcase />
				<DiscoverGameCards header='Most Popular' />
				<DiscoverGameShowcase />
				<DiscoverAdaptiveGameCards />
				<DiscoverGameShowcase />
			</div>
			<ExploreGames />
		</div>
	);
}
