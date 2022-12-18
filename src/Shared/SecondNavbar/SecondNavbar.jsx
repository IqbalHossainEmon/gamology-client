import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
  return (
    <div className={styles.SecondNavbar}>
      <div className={styles.leftSide}>
        <div className={styles.searchField}>
          <img src="/search.svg" alt="" srcSet="" />
          <input placeholder="Search Here" type="text" />
        </div>
        <div className={styles.navLinks}>
          <a href="#hello">Discover</a>
          <a href="#hello">Browse</a>
          <a href="#hello">News</a>
        </div>
      </div>
      <div className={styles.rightSide}>
        <a href="#wkwk">Wishlist</a>
        <a href="#wkwk">Cart</a>
      </div>
    </div>
  );
}
