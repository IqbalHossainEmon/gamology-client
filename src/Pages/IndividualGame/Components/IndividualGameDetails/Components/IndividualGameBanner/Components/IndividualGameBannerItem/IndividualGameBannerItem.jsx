import VideoPlayer from '../../../../../../../../Shared/VideoPlayer/VideoPlayer/VideoPlayer';
import styles from './IndividualGameBannerItem.module.css';

export default function IndividualGameBannerItem({ data }) {
  return (
    <li className={styles.individualGameBannerItem}>
      {data?.type === 'photo' ? (
        <img className={styles.coverImg} src={data?.cover} alt="" />
      ) : (
        <VideoPlayer
          src={data?.cover}
          {...(data?.captions && { captions: data?.captions })}
        />
      )}
    </li>
  );
}
