import LinksList from '../../../LinksList/LinksList';
import styles from './FirstNavLinks.module.css';

const links = [
  {
    no: 0,
    name: 'Store',
    URL: '#store',
  },
  { no: 1, name: 'FAQ', URL: '#faq' },
  { no: 2, name: 'Help', URL: '#Help' },
];

export default function FirstNavLinks({ setNavState }) {
  return (
    <ul className={styles.FirstNavLinks}>
      <LinksList
        active={0}
        styles={styles}
        links={links}
        onclick={setNavState}
      />
    </ul>
  );
}
