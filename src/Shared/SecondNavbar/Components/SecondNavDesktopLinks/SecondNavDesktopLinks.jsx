import useAppearDisappear from '../../../../Utils/Hooks/useAppearDisappear';
import useScreenWidth from '../../../../Utils/Hooks/useScreenWidth';
import LinksList from '../../../LinksList/LinksList';
import styles from './SecondNavDesktopLinks.module.css';

const links = [
	{
		no: 0,
		name: 'Discover',
		URL: '#discover',
	},
	{ no: 1, name: 'Browse', URL: '#browse' },
];

export default function SecondNavDesktopLinks({ navMidShow, setNavTextState, firstElement }) {
	const screenWidth = useScreenWidth();

	const [show, fadeIn] = useAppearDisappear(navMidShow);

	return (
		(show || screenWidth > 768) && (
			<div className={styles.navLinksContainer} ref={firstElement}>
				<ul
					className={`${styles.secondNavLinks}${fadeIn && screenWidth < 769 ? ` ${styles.navShow}` : ''}`}
				>
					<LinksList active={3} links={links} onclick={setNavTextState} styles={styles} />
				</ul>
			</div>
		)
	);
}
