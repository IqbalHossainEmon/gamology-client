import { useRef } from 'react';
import Menu from '../../../../../../Shared/Menu/Menu';
import RotateArrow from '../../../../../../Shared/RotateArrow/RotateArrow';
import styles from './DrawerOptions.module.css';

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

function DrawerOptions({ option, parentState }) {
	const toggleBtnRef = useRef(null);

	return option.subDrawer ? (
		<li className={styles.outerOptionContainer}>
			<Menu toggleBtn={toggleBtnRef} Title={MenuTitle} titleParams={{ option, parentState }}>
				<ul
					className={`${styles.innerOptionsContainer}${parentState ? ` ${styles.noPaddingLeft}` : ''}`}
				>
					{option.subDrawer.map(subOption => (
						<li className={styles.innerOptionContainer} key={subOption.id}>
							<p className={styles.innerOption}>
								<span className={styles.iconContainer}>{subOption.icon}</span>
								{subOption.name}
							</p>
						</li>
					))}
				</ul>
			</Menu>
		</li>
	) : (
		<li className={styles.outerOptionContainer}>
			<p className={styles.outerOption}>
				<span className={styles.iconContainer}>{option.icon}</span>
				{option.name}
			</p>
		</li>
	);
}

export default DrawerOptions;
