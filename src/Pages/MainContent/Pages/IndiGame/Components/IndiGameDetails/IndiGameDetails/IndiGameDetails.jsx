import IndiGameBanner from '../Components/IndiGameBanner/IndiGameBanner/IndiGameBanner';
import IndiGameDescription from '../Components/IndiGameDescription/IndiGameDescription/IndiGameDescription';
import IndiGameDetailAside from '../Components/IndiGameDetailAside/IndiGameDetailAside/IndiGameDetailAside';
import styles from './IndiGameDetails.module.css';

const data = {
	name: "Marvel's Spider-Man Remastered",
	price: { regular: 59.99, discount: 29.99 },
	logo: '/assets/images/CarouselInfo/spiderman-logo.png',
	phoneLogo: '/assets/images/spiderman-logo-cover.avif',
	info: [
		{ id: 1000, key: 'Developer', value: 'Insomniac Games, Nixxes Software' },
		{ id: 1001, key: 'Publisher', value: 'PlayStation' },
		{ id: 1010, key: 'Release Date', value: new Date('2022-07-12') },
		{ id: 1011, key: 'Platform', value: 'both' },
	],
};

function IndiGameDetails() {
	return (
		<>
			<div className={styles.bannerHeader}>
				<h2 className={styles.name}>{data.name}</h2>
			</div>
			<div className={styles.mainContentContainer}>
				<div className={styles.indiGameMainDetail}>
					<IndiGameBanner name={data.name} />
					<IndiGameDescription />
				</div>
				<div className={styles.asideDetail}>
					<IndiGameDetailAside data={data} />
				</div>
			</div>
		</>
	);
}

export default IndiGameDetails;
