import styles from './Item.module.css';

export default function Item({ banner, bannerState }) {
  const { active, fadeOut } = bannerState;
  const { coverImg, id } = banner;
  let idState;
  if (active === id) {
    idState = styles.bannerFadeIn;
  } else if (fadeOut === id) {
    idState = styles.bannerFadeOut;
  } else {
    idState = false;
  }
  return (
    <div className={`${styles.carouselItem} ${!idState ? styles.itemHide : ''}`} id={idState || ''}>
      <img src={coverImg} className={styles.carouselImg} alt="" />
    </div>
  );
}
