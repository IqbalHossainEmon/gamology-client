import Toast from '../Components/Toast/Toast';
import styles from './Toasts.module.css';

const Toasts = ({ toasts }) => {
	return (
		toasts.length && (
			<ul className={styles.toastContainer}>
				{toasts.map(toast => (
					<Toast key={toast.id} data={toast} show={true} />
				))}
			</ul>
		)
	);
};
export default Toasts;
