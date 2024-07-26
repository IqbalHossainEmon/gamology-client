import { useCallback } from 'react';
import Card from '../../../../../../../../../../../Shared/Card/Card';
import CardDot from '../../../../../../../Shared/CardDotContainer/Components/CardDot/CardDot';
import AllGamesModalBodySelect from '../Components/AllGamesModalBodyEvents/AllGamesModalBodySelect/AllGamesModalBodySelect';
import styles from './AllGamesBody.module.css';

const AllGamesBody = ({ items, setModal }) => {
    const modalBody = useCallback(
        (props, type, item) => <AllGamesModalBodySelect {...props} type={type} detail={item} />,
        []
    );

    return (
        <div className={styles.allGamesBody}>
            <ul className={styles.cardsContainer}>
                {items.map(item => (
                    <Card className={styles.list} key={item.id} cardInfo={item} image={item.image} alt={item.title}>
                        {prop => (
                            <CardDot
                                setModal={setModal}
                                parentRef={prop}
                                hoverClassName={styles.dots}
                                item={item}
                                lists={[
                                    {
                                        id: 1,
                                        name: 'Edit',
                                        event: () => console.log('Edit'),
                                    },
                                    {
                                        id: 2,
                                        name: 'Price',
                                        event: detail => {
                                            setModal({
                                                show: true,
                                                title: 'Edit Price',
                                                modalQuestion: (
                                                    <h3 className={styles.priceChangeHeader}>
                                                        What price you want to set for
                                                        <span className={styles.nameContainer}>{item.name}</span>
                                                    </h3>
                                                ),
                                                ModalBody: props => modalBody(props, 'price', detail),
                                            });
                                        },
                                    },
                                    {
                                        id: 3,
                                        name: 'Delete',
                                        event: detail => {
                                            setModal({
                                                show: true,
                                                title: 'Delete Game',
                                                modalQuestion: (
                                                    <h3 className={styles.priceChangeHeader}>
                                                        Are you sure you want to delete
                                                        <span className={styles.nameContainer}>{item.name}</span>?
                                                    </h3>
                                                ),
                                                ModalBody: props => modalBody(props, 'delete', detail),
                                            });
                                        },
                                    },
                                ]}
                            />
                        )}
                    </Card>
                ))}
            </ul>
        </div>
    );
};
export default AllGamesBody;
