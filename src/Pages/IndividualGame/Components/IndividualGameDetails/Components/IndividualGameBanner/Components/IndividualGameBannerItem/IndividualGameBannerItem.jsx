import IndividualGameBannerItemVideo from '../IndividualGameBannerItemVideo/IndividualGameBannerItemVideo';
import styles from './IndividualGameBannerItem.module.css';

export default function IndividualGameBannerItem({ data, active, index }) {
  return (
    <li className={styles.individualGameBannerItem}>
      {data.type === 'photo' ? (
        <img className={styles.coverImg} src={data?.cover} alt="" />
      ) : (
        <IndividualGameBannerItemVideo
          data={data}
          active={active}
          index={index}
        />
      )}
    </li>
  );
}
