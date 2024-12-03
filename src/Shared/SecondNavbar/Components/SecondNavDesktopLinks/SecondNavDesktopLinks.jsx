import LinksList from '../../../LinksList/LinksList';
import styles from './SecondNavDesktopLinks.module.css';

const links = [
	{
		no: 0,
		name: 'Discover',
		URL: '#discover',
	},
	{ no: 1, name: 'Browse', URL: '#browse' },
	{ no: 2, name: 'News', URL: '#news' },
];

export default function SecondNavDesktopLinks({ navMidShow, setNavTextState }) {
	return (
		<ul className={`${styles.SecondNavLinks}${navMidShow ? ` ${styles.show}` : ''}`}>
			<LinksList active={3} links={links} onclick={setNavTextState} styles={styles} />
		</ul>
	);
}
