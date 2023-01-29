export default function LinksList({ styles, links, onclick }) {
  return links.map((link) => (
    <li key={link.no} className={styles.navOption} id={styles.active}>
      <a onClick={onclick} href={link.URL}>
        {link.name}
      </a>
    </li>
  ));
}
