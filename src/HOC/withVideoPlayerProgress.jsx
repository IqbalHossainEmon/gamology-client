import { useState } from 'react';
import { VideoPlayerProgressContext, VideoPlayerSetProgressContext } from '../Contexts/VideoPlayerProgressContext';

const withVideoPlayerProgress = Component =>
  function InnerComponent(props) {
    const [progress, setProgress] = useState(0);

    return (
      <VideoPlayerProgressContext.Provider value={progress}>
        <VideoPlayerSetProgressContext.Provider value={setProgress}>
          <Component {...props} />
        </VideoPlayerSetProgressContext.Provider>
      </VideoPlayerProgressContext.Provider>
    );
  };

export default withVideoPlayerProgress;
