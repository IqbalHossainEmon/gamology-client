import Toast from '../Components/Toast/Toast';
import styles from './Toasts.module.css';

function Toasts({ toasts }) {
	return (
		toasts.length > 0 && (
			<ul className={styles.toastContainer}>
				{toasts.map(toast => (
					<Toast key={toast.id} fadeOut={toast.fadeOut} data={toast} show />
				))}
			</ul>
		)
	);
}
export default Toasts;
