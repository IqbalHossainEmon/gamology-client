import Browse from '../Pages/Browse/Browse/Browse';
import SecondNavbar from '../Shared/SecondNavbar/SecondNavBar/SecondNavbar';
import styles from './MainContent.module.css';

export default function MainContent() {
  return (
    <>
      <SecondNavbar />
      <main className={styles.main}>
        <Browse />
      </main>
    </>
  );
}
