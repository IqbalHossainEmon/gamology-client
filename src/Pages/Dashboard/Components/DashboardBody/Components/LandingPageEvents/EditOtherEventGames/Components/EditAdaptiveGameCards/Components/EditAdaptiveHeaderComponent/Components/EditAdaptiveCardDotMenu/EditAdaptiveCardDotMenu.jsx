import CardDot from '../../../../../../../../../Shared/CardDot/CardDot/CardDot';
import styles from './EditAdaptiveCardDotMenu.module.css';

function EditAdaptiveCardDotMenu({ cardRef, item, lists }) {
	return (
		<div className={styles.editAdaptiveCardDotMenu}>
			<CardDot parentRef={cardRef} item={item} lists={lists} />
		</div>
	);
}
export default EditAdaptiveCardDotMenu;
