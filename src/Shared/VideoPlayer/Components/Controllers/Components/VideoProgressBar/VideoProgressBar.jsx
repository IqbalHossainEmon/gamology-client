import { useCallback, useEffect, useRef, useState } from 'react';
import { useVideoPlayerProgress, useVideoPlayerSetProgress } from '../../../../../../Hooks/useVideoPlayerProgress';
import VideoSlider from '../VideoSlider/VideoSlider';

export default function VideoProgressBar({ video, videoContainer, src, isSeekedRef, changePause }) {
    const interval = useRef(null),
     [buffer, setBuffer] = useState(0),

     videoRef = useRef(video.current),

     progress = useVideoPlayerProgress(),
     setProgress = useVideoPlayerSetProgress(),

     progressRef = useRef(progress);
    progressRef.current = progress;

    const isPlaying = useRef(false),
     isMouseDown = useRef(false),

     shouldPlay = useRef(false),
     eventRefs = useRef({
        progressUpdate: () => {},
        progressBufferUpdate: () => {},
        handleError: () => {},
        handlePlaying: () => {},
        handlePause: () => {},
    });

    eventRefs.current.progressBufferUpdate = useCallback(({ target: { buffered, duration } }) => {
        if (buffered.length > 0) {
            if (buffered.length === 1) {
                setBuffer((buffered.end(buffered.length - 1) / duration) * 100);
            } else {
                const { currentTime } = videoRef.current;
                for (let i = 0; i < buffered.length; i++) {
                    if (buffered.end(i) >= currentTime && currentTime >= buffered.start(i)) {
                        setBuffer((buffered.end(i) / duration) * 100);
                        break;
                    }
                }
            }
        }
    }, []);

    eventRefs.current.progressUpdate = useCallback(
        ({ target: { duration, currentTime } }) => {
            if (!isMouseDown.current) {
                setProgress((currentTime / duration) * 100);
            }
        },
        [setProgress]
    );

    eventRefs.current.handleError = useCallback(() => {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }
    }, []);

    eventRefs.current.handlePlaying = useCallback(() => {
        if (isMouseDown.current) {
            videoRef.current.pause();
            shouldPlay.current = true;
        } else {
            isPlaying.current = true;
            isSeekedRef.current = true;
        }
    }, [isSeekedRef]);

    eventRefs.current.handlePause = useCallback(() => {
        isPlaying.current = false;
    }, []);

    useEffect(() => {
        const { progressUpdate, progressBufferUpdate, handleError, handlePlaying, handlePause } = eventRefs.current,

         addEventListeners = () => {
            videoRef.current.addEventListener('timeupdate', progressUpdate);
            videoRef.current.addEventListener('progress', progressBufferUpdate);
            videoRef.current.addEventListener('error', handleError);
            videoRef.current.addEventListener('playing', handlePlaying);
            videoRef.current.addEventListener('pause', handlePause);
        },

         removeEventListeners = () => {
            videoRef.current.removeEventListener('timeupdate', progressUpdate);
            videoRef.current.removeEventListener('progress', progressBufferUpdate);
            videoRef.current.removeEventListener('error', handleError);
            videoRef.current.removeEventListener('playing', handlePlaying);
            videoRef.current.removeEventListener('pause', handlePause);
        },

         initializeInterval = () => {
            interval.count = 0;
            interval.current = setInterval(() => {
                if (videoRef.current.buffered.length === 0) {
                    videoRef.current.load(src);
                } else {
                    progressBufferUpdate({ target: videoRef.current });
                    clearInterval(interval.current);
                    interval.current = null;
                }

                if (interval.count > 120) {
                    clearInterval(interval.current);
                    interval.current = null;
                }
                interval.count++;
            }, 500);
        };

        if (video.current) {
            videoRef.current = video.current;
            addEventListeners();

            if (!interval.current) {
                initializeInterval();
            }
        }

        return () => {
            if (videoRef.current) {
                removeEventListeners();
            }
        };
    }, [src, video]);

    // Set current time but after 100ms of mouse move else clear the timer
    const setCurrentTime = useCallback(val => {
        videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
    }, []),

     handleSetProgression = useCallback(
        val => {
            setProgress(val);
        },
        [setProgress]
    ),

     handleMouseUp = useCallback(() => {
        isMouseDown.current = false;

        setCurrentTime(progressRef.current);

        if (!isPlaying.current && shouldPlay.current) {
            videoRef.current.play();
            shouldPlay.current = false;
        }
    }, [setCurrentTime]),

     handleMouseDown = useCallback(() => {
        if (!videoRef.current.paused) {
            isSeekedRef.current = false;
        }

        isMouseDown.current = true;

        if (isPlaying.current) {
            videoRef.current.pause();
            shouldPlay.current = true;
        }
    }, [isSeekedRef]);

    return (
        <VideoSlider
            buffer={buffer}
            changePause={changePause}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            isBuffer
            position={progress}
            setPosition={handleSetProgression}
            videoContainer={videoContainer}
        />
    );
}
