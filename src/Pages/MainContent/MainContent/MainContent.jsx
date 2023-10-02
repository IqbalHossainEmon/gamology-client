import SecondNavbar from '../../../Shared/SecondNavbar/SecondNavBar/SecondNavbar';
import IndividualGame from '../../IndividualGame/IndividualGame/IndividualGame';
import styles from './MainContent.module.css';

export default function MainContent() {
  return (
    <>
      <SecondNavbar />
      <main className={styles.main}>
        <IndividualGame />
      </main>
    </>
  );
}
