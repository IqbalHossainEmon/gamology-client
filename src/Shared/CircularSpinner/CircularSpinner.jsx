import styles from './CircularSpinner.module.css';

export default function CircularSpinner({ width = 4, color = 'white' }) {
	return (
		<svg className={styles.spinner} viewBox="0 0 50 50">
			<circle
				className={styles.path}
				cx="25"
				cy="25"
				fill="none"
				r="20"
				stroke={color}
				strokeWidth={width}
			/>
		</svg>
	);
}
