import FirstNavbar from '../FirstNavbar/FirstNavBar/FirstNavbar';
import styles from './MainHeader.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <FirstNavbar />
    </header>
  );
}
