import { useEffect, useRef } from 'react';
import useToast from '../../../../../Hooks/useToast';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import AllGames from '../Components/AllGamesContainer/Components/AllGames/AllGames/AllGames';
import withDashboardModal from '../Components/HOC/withDashboardModal';
import styles from './DashboardBody.module.css';

function DashboardBody({ children }) {
	const parentRef = useRef(null);
	const childRef = useRef(null);

	const { hideToast, setToast } = useToast();

	useEffect(() => {
		setToast({
			toastTitle: 'Hello',
			toastMessage: 'This is a toast msg',
			type: 'error',
		});
	}, [setToast]);

	return (
		<div className={styles.dashboardBodyScrollContainer}>
			<button
				type='button'
				onClick={() => {
					setToast({
						toastTitle: 'Hello',
						toastMessage: 'This is a toast msg',
						type: 'error',
					});
				}}
			>
				click
			</button>
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
