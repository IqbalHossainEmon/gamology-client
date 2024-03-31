import Card from '../../../../../../../../../Shared/Card/Card';
import CardDot from '../Components/CardDot/CardDot/CardDot';
import styles from './AllGamesBody.module.css';

const AllGamesBody = ({ items, setModal }) => (
    <div className={styles.allGamesBody}>
        <ul className={styles.cardsContainer}>
            {items.map(item => (
                <Card className={styles.list} key={item.id} cardInfo={item} image={item.image} alt={item.title}>
                    <CardDot className={styles.cardDots} setModal={setModal} item={item} />
                </Card>
            ))}
        </ul>
    </div>
);
export default AllGamesBody;
