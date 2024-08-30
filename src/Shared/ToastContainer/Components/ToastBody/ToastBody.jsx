import styles from './ToastBody.module.css';

function ToastBody({ fadeIn, handleHide, data }) {
	console.log(data);

	const { toastTitle, toastMessage, toastIcon } = data;
	return (
		<li className={`${fadeIn ? `${styles.zoomIn} ` : ''} ${styles.toast}`}>
			<div>
				<div className={styles.icon}>{toastIcon}</div>
				<div className={styles.content}>
					<h3>{toastTitle}</h3>
					<p>{toastMessage}</p>
				</div>
			</div>
			<button className={styles.crossBtn} onClick={handleHide}>
				<span className={styles.cross} />
			</button>
		</li>
	);
}

export default ToastBody;
