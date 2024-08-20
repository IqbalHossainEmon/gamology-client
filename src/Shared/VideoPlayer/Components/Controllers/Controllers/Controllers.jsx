import { memo, useCallback, useEffect, useRef } from 'react';
import withVideoPlayerProgress from '../../../../../HOC/withVideoPlayerProgress';
import FullScreenButton, { handleFullScreen } from '../Components/FullScreenButton/FullScreenButton';
import GearButton from '../Components/GearButton/GearButton/GearButton';
import PlayPauseButton from '../Components/PlayPauseButton/PlayPauseButton';
import ProgressTimeShow from '../Components/ProgressTimeShow/ProgressTimeShow';
import VideoProgressBar from '../Components/VideoProgressBar/VideoProgressBar';
import VideoStatus from '../Components/VideoStatus/VideoStatus';
import VideoVolume from '../Components/VideoVolume/VideoVolume';
import styles from './Controllers.module.css';

function Controllers({ video, videoContainer, src, isControllerShowing, isChanging, changePause }) {
    const gearRef = useRef(null),
     clickTimerId = useRef(null),
     videoRef = useRef(video),

     isSeekedRef = useRef(true),
     canPlay = useRef(true),
     shouldPause = useRef(false),

     togglePausePlay = () => {
        if (canPlay.current) {
            if (!videoRef.current.ended) {
                if (videoRef.current.paused) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            } else {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
            }
        } else {
            shouldPause.current = true;
        }
    },

    // Handle full screen or toggle play depending on click type
     handleClick = () => {
        if (clickTimerId.current) {
            handleFullScreen(videoContainer.current);
            clearTimeout(clickTimerId.current);
            clickTimerId.current = null;
        } else {
            clickTimerId.current = setTimeout(() => {
                togglePausePlay();
                clickTimerId.current = null;
            }, 200);
        }
    },
     eventRef = useRef({
        handlePlaying: () => {},
        handleWaiting: () => {},
    });

    eventRef.current.handlePlaying = useCallback(() => {
        canPlay.current = true;
        if (shouldPause.current) {
            videoRef.current.pause();
            shouldPause.current = false;
        }
    }, []);

    eventRef.current.handleWaiting = useCallback(() => {
        canPlay.current = false;
    }, []);

    useEffect(() => {
        const { handlePlaying, handleWaiting } = eventRef.current,

         addEventListeners = videoElement => {
            videoElement.addEventListener('playing', handlePlaying);
            videoElement.addEventListener('waiting', handleWaiting);
        },

         removeEventListeners = videoElement => {
            videoElement.removeEventListener('playing', handlePlaying);
            videoElement.removeEventListener('waiting', handleWaiting);
        },

         updateVideoRef = videoElement => {
            videoRef.current = videoElement;
            addEventListeners(videoRef.current);
        };

        if (video.current) {
            updateVideoRef(video.current);
        }

        return () => {
            if (videoRef.current) {
                removeEventListeners(videoRef.current);
            }
        };
    }, [video]);

    return (
        <>
            <button
                className={styles.fullDisplayPlayPauseBtn}
                onClick={handleClick}
                type="button"
            />

            <ul
                className={styles.controllers}
                id={isControllerShowing ? styles.show : styles.hide}
            >
                <li className={styles.videoProgressSlider}>
                    <VideoProgressBar
                        changePause={changePause}
                        isSeekedRef={isSeekedRef}
                        src={src}
                        video={video}
                        videoContainer={videoContainer}
                    />
                </li>

                <li>
                    <PlayPauseButton
                        canPlay={canPlay}
                        isSeekedRef={isSeekedRef}
                        togglePausePlay={togglePausePlay}
                        video={video}
                    />
                </li>

                <li>
                    <VideoVolume
                        changePause={changePause}
                        video={video}
                        videoContainer={videoContainer}
                    />
                </li>

                <li>
                    <ProgressTimeShow video={video} />
                </li>

                <li
                    className={styles.gearButton}
                    ref={gearRef}
                >
                    <GearButton
                        gearRef={gearRef}
                        videoContainer={videoContainer}
                    />
                </li>

                <li>
                    <FullScreenButton videoContainer={videoContainer} />
                </li>
            </ul>

            <VideoStatus
                isChanging={isChanging}
                isSeekedRef={isSeekedRef}
                video={video}
            />
        </>
    );
}

export default withVideoPlayerProgress(memo(Controllers));
