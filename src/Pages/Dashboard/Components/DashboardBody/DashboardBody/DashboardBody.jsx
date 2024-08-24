import { useRef } from 'react';
import withDashboardModal from '../../../../../HOC/withDashboardModal';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import EditGame from '../Components/AllGamesContainer/Components/EditGame/EditGame/EditGame';
import styles from './DashboardBody.module.css';

function DashboardBody({ render }) {
	const parentRef = useRef(null);
	const childRef = useRef(null);

	return (
		<div className={styles.dashboardBodyScrollContainer}>
			<div className={styles.dashboardBodyContainer} ref={parentRef}>
				<div className={styles.dashboardBody} ref={childRef}>
					<EditGame />
				</div>
			</div>
			<ScrollBar childRef={childRef} parentRef={parentRef} />
			{render}
		</div>
	);
}

const EnhancedDashboardBody = withDashboardModal(DashboardBody);

export default EnhancedDashboardBody;
