import { useEffect, useState } from 'react';
import styles from './EditOtherEventGames.module.css';

function EditOtherEventGames() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<div className={styles.editOtherEventGames}>
			{loading ? (
				<p>loading...</p>
			) : (
				<div>
					<h2 className={styles.editOtherEventGames}>Edit Other Events</h2>
				</div>
			)}
		</div>
	);
}
export default EditOtherEventGames;
