import { useRef } from 'react';
import withDashboardModal from '../../../../../HOC/withDashboardModal';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import EditTags from '../Components/EditTags/EditTags/EditTags';
import styles from './DashboardBody.module.css';

const DashboardBody = ({ render }) => {
	const parentRef = useRef(null);
	const childRef = useRef(null);

	return (
		<div className={styles.dashboardBodyScrollContainer}>
			<div ref={parentRef} className={styles.dashboardBodyContainer}>
				<div ref={childRef} className={styles.dashboardBody}>
					<EditTags />
				</div>
			</div>
			<ScrollBar parentRef={parentRef} childRef={childRef} />
			{render}
		</div>
	);
};

const EnhancedDashboardBody = withDashboardModal(DashboardBody);

export default EnhancedDashboardBody;
