import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id={styles.footer}>
      <div className={styles.header}>
        <a href="/">
          <img src="./images/game-controller-1.png" alt="game-controller-logo" />
          <h2>Gamology</h2>
        </a>
      </div>
      <div className={styles.linkContainer}>
        <ol className={styles.links}>
          <li>
            <a href="#pp">Privacy Policy</a>
          </li>
          <li>
            <a href="#cp">Cookie Policy</a>
          </li>
          <li>
            <a href="#tos">Terms of Service</a>
          </li>
          <li>
            <a href="#IC">IR Contacts</a>
          </li>
          <li>
            <a href="#IS">Information Security</a>
          </li>
        </ol>
      </div>
      <div className={styles.description}>
        <p>
          <small>
            Share capital: 500,698,500 PLN paid in full; National Court Register (KRS) number:
            1269691510; District Court for the City of Dhaka, 14th Commercial;
          </small>
        </p>
        <p>
          <small>
            All trademarks referenced herein are the properties of their respective owners. ©2023
            Gamology All rights reserved
          </small>
        </p>
      </div>
    </footer>
  );
}
