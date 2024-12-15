import { forwardRef } from 'react';
import EditGameCards from '../Components/Events/EditGameCards/EditGameCards/EditGameCards';
import styles from './DashboardBody.module.css';

function DashboardBody(_, ref) {
	return (
		<div className={styles.dashboardBody} ref={ref}>
			<EditGameCards />
		</div>
	);
}

export default forwardRef(DashboardBody);
