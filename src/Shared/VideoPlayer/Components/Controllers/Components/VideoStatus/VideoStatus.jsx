import { useCallback, useEffect, useRef, useState } from 'react';
import useTimeFormat from '../../../../../../Hooks/useTimeFormate';
import CircularSpinner from '../../../../../CircularSpinner/CircularSpinner';
import styles from './VideoStatus.module.css';

export default function VideoStatus({ video, isSeekedRef, isChanging }) {
    const formatTime = useTimeFormat(),
     timerId = useRef(null),
     videoRef = useRef(video.current),

     eventRefs = useRef({
        loadMetaDataUpdate: () => {},
        loadUpdate: () => {},
        handlePlay: () => {},
        handlePause: () => {},
        handlePlaying: () => {},
        handleWaiting: () => {},
    }),

     [status, setStatus] = useState({
        duration: 0,
        initialShow: true,
        loading: false,
    }),

     handleTransition = () => {
        if (!timerId.current) {
            timerId.current = setTimeout(() => {
                timerId.current = null;
                setStatus(prev => ({ ...prev, animation: false }));
            }, 500);
        }
    };

    eventRefs.current.loadMetaDataUpdate = useCallback(({ target: { duration } }) => {
        setStatus(prev => ({ ...prev, duration }));
    }, []);

    eventRefs.current.loadUpdate = useCallback(() => {
        if (localStorage.getItem('autoplay') && videoRef.current.paused) {
            videoRef.current.play();
        }
    }, []);

    eventRefs.current.handlePlay = useCallback(() => {
        if (isSeekedRef.current) {
            setStatus(prev => {
                if (!prev.initialShow) {
                    return { play: true, animation: true, loading: false };
                }
                return {};
            });
            handleTransition();
        }
    }, [isSeekedRef]);

    eventRefs.current.handlePause = useCallback(() => {
        if (isSeekedRef.current && !videoRef.current.ended && !isChanging.current) {
            setStatus({ play: false, animation: true, loading: false });
            handleTransition();
        }
        if (isChanging.current) {
            isChanging.current = false;
        }
    }, [isChanging, isSeekedRef]);

    const initialBtnPlay = useCallback(() => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        }
    }, []);

    eventRefs.current.handlePlaying = useCallback(() => {
        setStatus(prev => ({ ...prev, loading: false }));
    }, []);

    eventRefs.current.handleWaiting = useCallback(() => {
        setStatus(prev => ({ ...prev, loading: true }));
    }, []);

    useEffect(() => {
        const { loadMetaDataUpdate, loadUpdate, handlePlay, handlePause, handlePlaying, handleWaiting } =
            eventRefs.current,

         addEventListeners = videoElement => {
            videoElement.addEventListener('loadedmetadata', loadMetaDataUpdate);
            videoElement.addEventListener('loadeddata', loadUpdate);
            videoElement.addEventListener('play', handlePlay);
            videoElement.addEventListener('pause', handlePause);
            videoElement.addEventListener('playing', handlePlaying);
            videoElement.addEventListener('waiting', handleWaiting);
        },

         removeEventListeners = videoElement => {
            videoElement.removeEventListener('loadedmetadata', loadMetaDataUpdate);
            videoElement.removeEventListener('loadeddata', loadUpdate);
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
            videoElement.removeEventListener('playing', handlePlaying);
            videoElement.removeEventListener('waiting', handleWaiting);
        };

        if (video.current) {
            videoRef.current = video.current;
            addEventListeners(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                removeEventListeners(videoRef.current);
            }
        };
    }, [video]);

    return (
        <>
            {!status.initialShow && !status.animation && status.loading ? <div>
                <CircularSpinner />
                                                                          </div> : null}

            {!status.initialShow && (
                <div className={status.animation ? [styles.videoStatus, styles.fadeOut].join(' ') : styles.videoStatus}>
                    <span {...(!status.play && { className: styles.marginLeft })}>
                        <svg viewBox={status.play ? '0 0 10 14' : '0 0 11 14'}>
                            <path
                                d={status.play ? 'M0 14h3V0H0v14zM7 0v14h3V0H7z' : 'M0 0v14l11-7z'}
                                fill="white"
                            />
                        </svg>
                    </span>
                </div>
            )}

            {status.initialShow && status.duration > 0 ? <div className={styles.initialPlaceholder}>
                <button
                    className={styles.initialPlaceholderButton}
                    onClick={initialBtnPlay}
                    type="button"
                >
                    <span className={styles.svgContainer}>
                        <svg viewBox="0 0 11 14">
                            <path
                                d="M0 0v14l11-7z"
                                fill="black"
                                fillRule="nonzero"
                            />
                        </svg>
                    </span>

                    <span>
                        {status.duration ? formatTime(status.duration) : '0:00'}
                    </span>
                </button>
                                                         </div> : null}
        </>
    );
}
