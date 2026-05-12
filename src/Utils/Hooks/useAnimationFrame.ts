import { useCallback, useEffect, useRef } from "react";

type Animate = (timestamp: number) => void;

const useAnimationFrame = (
  setState: (value: number) => void,
  duration: number,
  isPaused: boolean,
  handleDone?: () => void,
  delay = 0,
) => {
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame>>(null);
  const startTimeRef = useRef<DOMHighResTimeStamp>(null);
  const elapsedTimeRef = useRef<number>(0);
  const animateFnRef = useRef<Animate>(null);

  const cancelAnimation = useCallback((paused: boolean) => {
    if (animationRef.current !== null) {
      if (paused && startTimeRef.current !== null) {
        elapsedTimeRef.current += performance.now() - startTimeRef.current;
      }
      cancelAnimationFrame(animationRef.current);
      startTimeRef.current = null;
      animationRef.current = null;
    }
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      startTimeRef.current ??= timestamp;

      const elapsed = timestamp - startTimeRef.current + elapsedTimeRef.current;
      if (elapsed < delay) {
        if (animateFnRef.current) {
          animationRef.current = requestAnimationFrame(animateFnRef.current);
        }
        return;
      }

      const progress = Math.min((elapsed - delay) / duration, 1);
      setState(progress);

      if (progress < 1 && animateFnRef.current) {
        animationRef.current = requestAnimationFrame(animateFnRef.current);
      } else if (handleDone) {
        handleDone();
      }
    },
    [delay, duration, handleDone, setState],
  );

  useEffect(() => {
    animateFnRef.current = animate;
  }, [animate]);

  const handleStartOrResume = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimation(false);
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [animate, cancelAnimation]);

  useEffect(() => {
    if (isPaused) {
      cancelAnimation(true);
    } else {
      handleStartOrResume();
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cancelAnimation, handleStartOrResume, isPaused]);
};
export default useAnimationFrame;
