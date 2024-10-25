import RotateArrow from '../RotateArrow/RotateArrow';
import styles from './MenuTitle.module.css';

function MenuTitle({ option, parentState, state }) {
	return (
		<>
			<span className={styles.iconContainer}>{option.icon}</span>
			{option.name}
			<div className={`${parentState ? `${styles.arrowBottom} ` : ``}${styles.arrow}`}>
				<RotateArrow state={state} />
			</div>
		</>
	);
}

export default MenuTitle;
