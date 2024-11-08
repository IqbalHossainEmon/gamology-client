import Menu from '../../../../../../Shared/Menu/Menu';
import MenuTitle from '../../../../../../Shared/MenuTitle/MenuTitle';
import styles from './DrawerOptions.module.css';

function DrawerOptions({ option, parentState }) {
	return option.subDrawer ? (
		<li className={styles.outerOptionContainer}>
			<Menu
				Title={MenuTitle}
				titleParams={{
					name: option.name,
					icon: option.icon,
					parentState,
					paddingRight: true,
				}}
			>
				<ul className={styles.innerOptionsContainer}>
					{option.subDrawer.map(subOption => (
						<li className={styles.innerOptionContainer} key={subOption.id}>
							<p className={styles.innerOption}>
								<span
									className={`${styles.iconContainer}${parentState ? ` ${styles.noTranslate}` : ''}`}
								>
									{subOption.icon}
								</span>
								<span>{subOption.name}</span>
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
