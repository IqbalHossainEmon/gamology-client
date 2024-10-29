import styles from './DrawerFooter.module.css';

function DrawerFooter({ collapse, screenWidth }) {
	return (
		<footer
			className={`${collapse && screenWidth > 1099 ? `${styles.footerHide} ` : ''}${styles.footer}`}
		>
			<div className={styles.footerInnerContainer}>
				<ol className={styles.footerLinks}>
					{[
						{ text: 'Privacy Policy', link: 'privacyPolicy' },
						{ text: 'Cookie Policy', link: 'cookiePolicy' },
						{ text: 'Terms of Service', link: 'termsOfService' },
						{ text: 'IR Contacts', link: 'IRContacts' },
						{
							text: 'Information Security',
							link: 'informationSecurity',
						},
					].map(link => (
						<li className={styles.footerLinkContainer} key={link.link}>
							<a className={styles.footerLink} href={link.link}>
								{link.text}
							</a>
						</li>
					))}
				</ol>
				<p className={styles.footerCopyWrite}>
					<small>
						&copy;2024 <span className={styles.gamologyText}>Gamology</span>
					</small>
				</p>
			</div>
		</footer>
	);
}
export default DrawerFooter;
