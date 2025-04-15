import useAppearDisappear from '../../../../Utils/Hooks/useAppearDisappear';
import useScreenWidth from '../../../../Utils/Hooks/useScreenWidth';
import LinksList from '../../../LinksList/LinksList';

import styles from './SecondNavLinkList.module.css';

const links = [
	{
		no: 0,
		name: 'Discover',
		URL: '#discover',
	},
	{ no: 1, name: 'Browse', URL: '#browse' },
];

export default function SecondNavLinkList({ navMidShow, setNavTextState, firstElement }) {
	const { widthInRem } = useScreenWidth();

	const [show, fadeIn] = useAppearDisappear(navMidShow);

	return (
		(show || widthInRem > 48) && (
			<div className={styles.navLinksContainer} ref={firstElement}>
				<ul
					className={`${styles.secondNavLinks}${fadeIn && widthInRem < 48.0625 ? ` ${styles.navShow}` : ''}`}
				>
					<LinksList active={3} links={links} onclick={setNavTextState} styles={styles} />
				</ul>
			</div>
		)
	);
}
