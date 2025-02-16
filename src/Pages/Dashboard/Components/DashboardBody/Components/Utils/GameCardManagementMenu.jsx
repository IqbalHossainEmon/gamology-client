import CardDot from '../../Shared/CardDot/CardDot/CardDot';

function GameCardManagementMenu({ parentRef, lists, item }) {
	return <CardDot parentRef={parentRef} lists={lists} item={item} />;
}

export default GameCardManagementMenu;
