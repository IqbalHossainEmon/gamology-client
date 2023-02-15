import useScreenInfo from '../../Hooks/useScreenInfo';

export default function LinksList({ styles, links, onclick, active }) {
  const { screenWidth } = useScreenInfo();
  return links.map((link) => (
    <li
      key={link.no}
      className={styles.navOption}
      {...(link.no === active && { id: styles.active })}
    >
      <a
        {...(onclick && screenWidth <= 768 && { onClick: () => onclick(link.no) })}
        href={link.URL}
      >
        {link.name}
      </a>
    </li>
  ));
}
