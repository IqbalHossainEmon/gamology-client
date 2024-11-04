import styles from './ScrollPath.module.css';

function ScrollPath({ container }) {
	return (
		<div
			className={styles.scrollPath}
			role='scrollbar'
			aria-controls='scrollContainer'
			aria-orientation='vertical'
			aria-valuemax='100'
			aria-valuemin='0'
			aria-valuenow='0'
		/>
	);
}
export default ScrollPath;
