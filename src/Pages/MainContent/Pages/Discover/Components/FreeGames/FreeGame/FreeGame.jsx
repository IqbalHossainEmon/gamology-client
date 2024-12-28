import { useEffect, useState } from 'react';
import Image from '../../../../../../../Shared/Image/Image';
import styles from './FreeGame.module.css';

// Get the month name depending on given time
function getMonthName(monthNumber) {
	const date = new Date();
	date.setMonth(monthNumber - 1);
	return date.toLocaleString('en-US', { month: 'long' });
}

export default function FreeGame({ data, today, length }) {
	const [dateState, setDateState] = useState(-1);

	// Finding todays date and comparing the upcoming / expire date and setting styles
	useEffect(() => {
		const todayDate = new Date(`${today[2]}-${today[1]}-${today[0]}`);
		const firstDay = new Date(
			`${data.saleTill[0][2]}-${data.saleTill[0][1]}-${data.saleTill[0][0]}`
		);
		const lastDay = new Date(
			`${data.saleTill[1][2]}-${data.saleTill[1][1]}-${data.saleTill[1][0]}`
		);
		if (todayDate < firstDay) {
			setDateState(0);
		} else if (todayDate >= firstDay && todayDate < lastDay) {
			setDateState(1);
		} else if (todayDate > lastDay) {
			setDateState(-1);
		}
	}, [today, data.saleTill]);

	return (
		dateState !== -1 && (
			<div className={`${styles.freeGame} hover-shadow`}>
				<div className={styles.gameHeader}>
					<Image data={data.carouselThumb} alt={data.name} aspectRatio={3 / length} />
					{dateState !== -1 && (
						<p
							className={
								dateState === 1
									? [styles.common, styles.freeNow].join(' ')
									: [styles.common, styles.coming].join(' ')
							}
						>
							{dateState === 1 ? 'FREE GAME' : 'COMING SOON'}
						</p>
					)}
				</div>
				<div className={styles.gameDetail}>
					<p className={styles.name}>{data.name}</p>

					<p className={styles.date}>
						{`${getMonthName(data.saleTill[0][1]).slice(0, 3)} ${
							data.saleTill[0][0]
						} - ${getMonthName(data.saleTill[1][1]).slice(0, 3)} ${data.saleTill[1][0]}`}
					</p>
				</div>
			</div>
		)
	);
}
