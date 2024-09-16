import styles from './DashboardModal.module.css';

function DashboardModal({ content }) {
	const { title, body, footer } = content;
	if (!title || !body) {
		return null;
	}
	return (
		<>
			<h2 className={styles.header}>{title}</h2>
			<div className={styles.headerQuestion}>{body}</div>
			<div>{footer}</div>
		</>
	);
}
export default DashboardModal;
