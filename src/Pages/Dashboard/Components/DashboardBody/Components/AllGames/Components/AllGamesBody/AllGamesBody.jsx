import Card from '../../../../../../../../Shared/Card/Card';
import styles from './AllGamesBody.module.css';

const AllGamesBody = ({ items }) => (
  <div className={styles.allGamesBody}>
    <ul className={styles.cardsContainer}>
      {items.map(item => (
        <Card key={item.id} cardInfo={item} />
      ))}
    </ul>
  </div>
);
export default AllGamesBody;
