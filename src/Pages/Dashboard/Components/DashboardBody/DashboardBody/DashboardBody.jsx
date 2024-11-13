import { forwardRef } from 'react';
import EditTags from '../Components/EditTags/EditTags/EditTags';
import styles from './DashboardBody.module.css';

function DashboardBody(_, ref) {
	return (
		<div className={styles.dashboardBody} ref={ref}>
			<EditTags />
		</div>
	);
}

export default forwardRef(DashboardBody);
