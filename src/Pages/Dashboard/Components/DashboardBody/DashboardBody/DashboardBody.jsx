import { useRef } from 'react';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import AllGames from '../Components/AllGamesContainer/Components/AllGames/AllGames/AllGames';
import withDashboardModal from '../Components/HOC/withDashboardModal';
import styles from './DashboardBody.module.css';

function DashboardBody({ children }) {
	const parentRef = useRef(null);
	const childRef = useRef(null);

	return (
		<div className={styles.dashboardBodyScrollContainer}>
			<div className={styles.dashboardBodyContainer} ref={parentRef}>
				<div className={styles.dashboardBody} ref={childRef}>
					<AllGames />
				</div>
			</div>
			<ScrollBar childRef={childRef} parentRef={parentRef} />
			{children}
		</div>
	);
}

const EnhancedDashboardBody = withDashboardModal(DashboardBody);

export default EnhancedDashboardBody;
