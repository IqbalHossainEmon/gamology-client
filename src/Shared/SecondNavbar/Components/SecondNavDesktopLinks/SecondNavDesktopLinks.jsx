import LinksList from '../../../LinksList/LinksList';
import styles from './SecondNavDesktopLinks.module.css';

const links = [
  {
    no: 0,
    name: 'Discover',
    URL: '#discover'
  },
  { no: 1, name: 'Browse', URL: '#browse' },
  { no: 2, name: 'News', URL: '#news' }
];

export default function SecondNavDesktopLinks({ id, setNavTextState }) {
  return (
    <ul className={styles.SecondNavLinks} id={styles[id]}>
      <LinksList active={0} styles={styles} links={links} onclick={setNavTextState} />
    </ul>
  );
}
