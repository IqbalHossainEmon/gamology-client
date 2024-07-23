import useAppearDisappear from '../../../../../../Hooks/useAppearDisappear';
import styles from './CardDotList.module.css';

const CardDotList = ({ lists, listShow, handleHide, item }) => {
    const { show, fadeIn } = useAppearDisappear(listShow);

    return (
        show && (
            <ul className={`${styles.listContainer}${fadeIn ? ` ${styles.zoomIn}` : ''}`}>
                {lists.map(list => (
                    <li key={list.id}>
                        <button
                            onClick={() => {
                                list.event(item);
                                handleHide();
                            }}
                            type="button"
                        >
                            {list.name}
                        </button>
                    </li>
                ))}
            </ul>
        )
    );
};
export default CardDotList;
