import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import styles from './Toast.module.css';

function Toast() {
	const { show, fadeIn } = useAppearDisappear();
	return (
		<div className={styles.toast}>
			<p>hello</p>
		</div>
	);
}
export default Toast;
