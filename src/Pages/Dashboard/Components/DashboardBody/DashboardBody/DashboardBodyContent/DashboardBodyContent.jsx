import EditGame from '../../Components/AllGames/Components/EditGame/EditGame/EditGame';
import withDashboardTooltip from '../../Components/Utils/HOC/withDashboardTooltip';

function DashboardBodyContent() {
	return <EditGame />;
}

const EnhancedDashboardBodyContent = withDashboardTooltip(DashboardBodyContent);

export default EnhancedDashboardBodyContent;
