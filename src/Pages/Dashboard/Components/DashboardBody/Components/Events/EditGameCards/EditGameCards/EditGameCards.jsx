import { useRef } from 'react';
import EditGameCardContainer from '../Components/EditGameCardContainer/EditGameCardContainer/EditGameCardContainer';
import styles from './EditGameCards.module.css';

function EditGameCards() {
	const headerRef = useRef(null);

	return (
		<div className={styles.editGameCards}>
			<h2 className={styles.editBannerHeader} ref={headerRef}>
				Edit Game Cards
			</h2>
			<EditGameCardContainer />
		</div>
	);
}
export default EditGameCards;
