import useAppearDisappear from '../../../../../../../../../../../../Hooks/useAppearDisappear';
import IndiGameOrderByList from '../IndiGameOrderByList/IndiGameOrderByList';
import styles from './IndiGameOrderByListContainer.module.css';

const IndiGameOrderByListContainer = ({ state, listRef, ...rest }) => {
    const { show, fadeIn } = useAppearDisappear(state);
    return (
        show && (
            <ul ref={listRef} className={`${styles.orderOptions}${fadeIn ? ` ${styles.zoomIn}` : ''}`}>
                <IndiGameOrderByList {...rest} />{' '}
            </ul>
        )
    );
};
export default IndiGameOrderByListContainer;
