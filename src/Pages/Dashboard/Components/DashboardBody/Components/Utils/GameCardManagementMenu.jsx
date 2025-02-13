import CardDot from '../../Shared/CardDot/CardDot/CardDot';

function GameCardManagementMenu({ parentRef, lists }) {
	console.log(lists);

	return <CardDot parentRef={parentRef} lists={lists} />;
}

export default GameCardManagementMenu;
