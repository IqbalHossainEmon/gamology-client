import styles from './ToastBody.module.css';

const ToastBody = ({ fadeIn, handleHide, children }) => {
	return (
		<div className={`${fadeIn ? `${styles.zoomIn} ` : ''} ${styles.toast}`}>
			<div className={styles.toastContentContainer}>{children}</div>
			<button className={styles.crossBtn} onClick={handleHide} type="button">
				<span className={styles.cross} />
			</button>
		</div>
	);
};
export default ToastBody;
