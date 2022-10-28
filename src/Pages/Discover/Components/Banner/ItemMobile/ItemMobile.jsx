import styles from './ItemMobile.module.css';

export default function ItemMobile({ banner, cardsPosition }) {
  const { coverMobile, name, id } = banner;
  let position;
  switch (cardsPosition[id]) {
    case 0:
      position = styles.first;
      break;
    case 1:
      position = styles.two;
      break;
    case 2:
      position = styles.three;
      break;
    case 3:
      position = styles.four;
      break;
    case 4:
      position = styles.five;
      break;
    default:
      position = 0;
      break;
  }
  return (
    <div id={position} className={`${styles.carouselItem}`}>
      <img
        src={coverMobile}
        className={styles.carouselImg}
        alt={`${name} carousel cover-${id + 1}`}
      />
    </div>
  );
}
