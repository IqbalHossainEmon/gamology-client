import Menu from '../../../../../../Shared/Menu/Menu/Menu';

import styles from './DrawerOptions.module.css';

function DrawerOptions({ option, parentState }) {
	return option.subDrawer ? (
		<li className={styles.outerOptionContainer}>
			<Menu name={option.name} icon={option.icon} parentState={parentState} paddingRight>
				{isShowing => (
					<ul className={styles.innerOptionsContainer}>
						{option.subDrawer.map(subOption => (
							<li className={styles.innerOptionContainer} key={subOption.id}>
								<button
									type='button'
									className={styles.innerOption}
									{...(isShowing || { tabIndex: -1 })}
								>
									<p>
										<span
											className={`${styles.iconContainer}${parentState ? ` ${styles.noTranslate}` : ''}`}
										>
											{subOption.icon}
										</span>
										<span className={styles.text}>{subOption.name}</span>
									</p>
								</button>
							</li>
						))}
					</ul>
				)}
			</Menu>
		</li>
	) : (
		<li className={styles.outerOptionContainer}>
			<button type='button' className={styles.outerOption}>
				<p>
					<span className={styles.iconContainer}>{option.icon}</span>
					{option.name}
				</p>
			</button>
		</li>
	);
}

export default DrawerOptions;
