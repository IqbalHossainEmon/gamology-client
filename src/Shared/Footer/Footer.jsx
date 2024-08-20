import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer id={styles.footer}>
            <div className={styles.header}>
                <a href="/">
                    <img
                        alt="game-controller-logo"
                        src="/assets/images/game-controller.png"
                    />

                    <h2>
                        Gamology
                    </h2>
                </a>
            </div>

            <div className={styles.linkContainer}>
                <ol className={styles.links}>
                    {[
                        { text: 'Privacy Policy', link: 'privacyPolicy' },
                        { text: 'Cookie Policy', link: 'cookiePolicy' },
                        { text: 'Store Refund Policy', link: 'storeRefundPolicy' },
                        { text: 'Contacts', link: 'Contacts' },
                        { text: 'Thanks', link: 'thanks' },
                    ].map(link => (
                        <li key={link.link}>
                            <a href={link.link}>
                                {link.text}
                            </a>
                        </li>
                    ))}
                </ol>
            </div>

            <div className={styles.description}>
                <p>
                    <small>
                        Share capital: 500,698,500 PLN paid in full; National Court Register (KRS) number: 1269691510; District Court for
                        the City of Dhaka, 14th Commercial;
                    </small>
                </p>

                <p>
                    <small>
                        All trademarks referenced herein are the properties of their respective owners. &copy;2023 Gamology All rights
                        reserved
                    </small>
                </p>
            </div>
        </footer>
    );
}
