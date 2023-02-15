import FirstNavbar from '../FirstNavbar/FirstNavBar/FirstNavbar';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <FirstNavbar />
    </header>
  );
}
