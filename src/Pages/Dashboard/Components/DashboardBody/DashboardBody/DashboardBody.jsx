import { forwardRef } from 'react';
import EditGame from '../Components/AllGames/Components/EditGame/EditGame/EditGame';
import styles from './DashboardBody.module.css';

function DashboardBody(_, ref) {
	return (
		<div className={styles.dashboardBody} ref={ref}>
			<EditGame />
		</div>
	);
}

export default forwardRef(DashboardBody);
