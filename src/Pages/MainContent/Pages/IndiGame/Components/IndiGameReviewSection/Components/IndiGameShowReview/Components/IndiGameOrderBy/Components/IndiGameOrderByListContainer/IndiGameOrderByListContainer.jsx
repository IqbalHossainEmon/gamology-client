import useAppearDisappear from '../../../../../../../../../../../../Hooks/useAppearDisappear';
import IndiGameOrderByList from '../IndiGameOrderByList/IndiGameOrderByList';
import styles from './IndiGameOrderByListContainer.module.css';

function IndiGameOrderByListContainer({ state, listRef, ...rest }) {
	const { show, fadeIn } = useAppearDisappear(state);
	return (
		show && (
			<ul
				className={`${styles.orderOptions}${fadeIn ? ` ${styles.zoomIn}` : ''}`}
				ref={listRef}
			>
				<IndiGameOrderByList {...rest} />{' '}
			</ul>
		)
	);
}
export default IndiGameOrderByListContainer;
