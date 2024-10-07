import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import styles from './TooltipBody.module.css';

function TooltipBody({ message, state, position }) {
	const [show, fadeIn] = useAppearDisappear(state);

	let tooltipPosition = '';

	switch (position) {
		case 'bottom':
			tooltipPosition = styles.bottom;
			break;
		case 'left':
			tooltipPosition = styles.left;
			break;
		case 'right':
			tooltipPosition = styles.right;
			break;
		default:
			tooltipPosition = styles.top;
			break;
	}

	return (
		show && (
			<div
				className={`${styles.toolTips}${fadeIn ? ` ${styles.fadeIn}` : ''} ${tooltipPosition}`}
			>
				<p>{message}</p>
			</div>
		)
	);
}
export default TooltipBody;
