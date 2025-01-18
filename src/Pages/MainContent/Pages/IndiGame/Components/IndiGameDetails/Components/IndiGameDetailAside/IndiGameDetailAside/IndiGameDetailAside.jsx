import { useEffect, useState } from 'react';
import IndiGameAsideBody from '../Components/IndiGameAsideBody/IndiGameAsideBody/IndiGameAsideBody';
import IndiGameAsideHeader from '../Components/IndiGameAsideHeader/IndiGameAsideHeader';
import styles from './IndiGameDetailAside.module.css';

export default function IndiGameDetailAside({ data }) {
	const [gameInfo, setGameInfo] = useState({});

	useEffect(() => {
		setGameInfo(data);
	}, []);

	return (
		<aside className={styles.individualGameDetailAside}>
			<div className={styles.asideContainer}>
				<IndiGameAsideHeader
					name={gameInfo.name}
					phoneSrc={gameInfo.phoneLogo}
					price={gameInfo.price}
					rating={gameInfo.star}
					src={gameInfo.logo}
				/>
				{gameInfo.info ? <IndiGameAsideBody info={gameInfo.info} /> : null}
			</div>
		</aside>
	);
}
