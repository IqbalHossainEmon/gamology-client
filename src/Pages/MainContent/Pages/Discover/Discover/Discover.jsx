import DiscoverBanner from '../Components/DiscoverBanner/DiscoverBanner/DiscoverBanner';
import DiscoverDynamicGameCards from '../Components/DiscoverDynamicGameCards/DiscoverDynamicGameCards';
import DiscoverGameCards from '../Components/DiscoverGameCards/DiscoverGameCards';
import DiscoverGameShowCase from '../Components/DiscoverGameShowCase/DiscoverGameShowCase';
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
				<DiscoverDynamicGameCards />
				<DiscoverGameCards header='Summer Spotlight' />
				<DiscoverGameShowCase />
				<DiscoverGameCards header='Most Popular' />
				<DiscoverGameShowCase />
				<DiscoverDynamicGameCards />
				<DiscoverGameShowCase />
			</div>
			<ExploreGames />
		</div>
	);
}
