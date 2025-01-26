import { useEffect, useRef, useState } from 'react';
import EditGameShowCase from '../Components/EditGameShowCase/EditGameShowCase/EditGameShowCase';
import styles from './EditOtherEventGames.module.css';

function EditOtherEventGames() {
	const [loading, setLoading] = useState(true);

	const sectionsRefs = useRef([]);

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
					<EditGameShowCase />
				</div>
			)}
		</div>
	);
}
export default EditOtherEventGames;
