import { useContext } from 'react';
import { VideoPlayerProgressContext, VideoPlayerSetProgressContext } from '../Contexts/VideoPlayerProgressContext';

export const useVideoPlayerProgress = () => useContext(VideoPlayerProgressContext);
export const useVideoPlayerSetProgress = () => useContext(VideoPlayerSetProgressContext);
