import { useEffect, useState } from 'react';
import VideoPlayer from '../../../../../../../../Shared/VideoPlayer/VideoPlayer/VideoPlayer';

export default function IndividualGameBannerItemVideo({ active, data, index }) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (active === index) {
      setShouldShow(true);
    }
  }, [active, index]);

  return (
    shouldShow && (
      <VideoPlayer
        changePause={active}
        src={data.cover}
        {...(data.captions && { captions: data.captions })}
      />
    )
  );
}
