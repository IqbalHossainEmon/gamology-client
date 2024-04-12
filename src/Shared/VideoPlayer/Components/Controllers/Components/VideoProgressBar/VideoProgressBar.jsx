import { useCallback, useEffect, useRef, useState } from 'react';
import { useVideoPlayerProgress, useVideoPlayerSetProgress } from '../../../../../../Hooks/useVideoPlayerProgress';
import VideoSlider from '../VideoSlider/VideoSlider';

export default function VideoProgressBar({ video, videoContainer, src, isSeekedRef, changePause }) {
    const interval = useRef(null);
    const [buffer, setBuffer] = useState(0);

    const videoRef = useRef(video.current);

    const progress = useVideoPlayerProgress();
    const setProgress = useVideoPlayerSetProgress();

    const progressRef = useRef(progress);
    progressRef.current = progress;

    const isPlaying = useRef(false);
    const isMouseDown = useRef(false);

    const shouldPlay = useRef(false);
    const eventRef = useRef(null);

    eventRef.progressBufferUpdate = useCallback(({ target: { buffered, duration } }) => {
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

    eventRef.progressUpdate = useCallback(
        ({ target: { duration, currentTime } }) => {
            if (!isMouseDown.current) {
                setProgress((currentTime / duration) * 100);
            }
        },
        [setProgress]
    );

    eventRef.handleError = useCallback(() => {
        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }
    }, []);

    eventRef.handlePlaying = useCallback(() => {
        if (isMouseDown.current) {
            videoRef.current.pause();
            shouldPlay.current = true;
        } else {
            isPlaying.current = true;
            isSeekedRef.current = true;
        }
    }, [isSeekedRef]);

    eventRef.handlePause = useCallback(() => {
        isPlaying.current = false;
    }, []);

    useEffect(() => {
        if (video.current) {
            videoRef.current = video.current;

            videoRef.current.addEventListener('timeupdate', eventRef.progressUpdate);
            videoRef.current.addEventListener('progress', eventRef.progressBufferUpdate);
            videoRef.current.addEventListener('error', eventRef.handleError);
            videoRef.current.addEventListener('playing', eventRef.handlePlaying);
            videoRef.current.addEventListener('pause', eventRef.handlePause);

            if (!interval.current) {
                interval.count = 0;
                interval.current = setInterval(() => {
                    if (videoRef.current.buffered.length === 0) {
                        videoRef.current.load(src);
                    } else {
                        eventRef.progressBufferUpdate({ target: videoRef.current });
                        clearInterval(interval.current);
                        interval.current = null;
                    }

                    if (interval.count > 120) {
                        clearInterval(interval.current);
                        interval.current = null;
                    }
                    interval.count++;
                }, 500);
            }
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', eventRef.progressUpdate);
                videoRef.current.removeEventListener('progress', eventRef.progressBufferUpdate);
                videoRef.current.removeEventListener('error', eventRef.handleError);
                videoRef.current.removeEventListener('playing', eventRef.handlePlaying);
                videoRef.current.removeEventListener('pause', eventRef.handlePause);
            }
        };
    }, [src, video]);

    // set current time but after 100ms of mouse move else clear the timer
    const setCurrentTime = useCallback(val => {
        videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
    }, []);

    const handleSetProgression = useCallback(
        val => {
            setProgress(val);
        },
        [setProgress]
    );

    const handleMouseUp = useCallback(() => {
        isMouseDown.current = false;

        setCurrentTime(progressRef.current);

        if (!isPlaying.current && shouldPlay.current) {
            videoRef.current.play();
            shouldPlay.current = false;
        }
    }, [setCurrentTime]);

    const handleMouseDown = useCallback(() => {
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
            changePause={changePause}
            videoContainer={videoContainer}
            isBuffer
            position={progress}
            buffer={buffer}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            setPosition={handleSetProgression}
        />
    );
}
