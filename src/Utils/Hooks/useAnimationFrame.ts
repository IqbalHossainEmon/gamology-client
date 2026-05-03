import { useCallback, useEffect, useRef } from "react";

type animationFrameRef = ReturnType<typeof requestAnimationFrame>;

type Animate = (timestamp: number) => void;

const useAnimationFrame = (
  setState: (value: number) => void,
  duration: number,
  isPaused: boolean,
  handleDone?: () => void,
) => {
  const animationRef = useRef<animationFrameRef>(null);
  const startTimeRef = useRef<animationFrameRef>(null);
  const elapsedTimeRef = useRef<number>(0);
  const animateFnRef = useRef<Animate>(null);

  const cancelAnimation = useCallback((paused: boolean) => {
    if (animationRef.current) {
      if (paused && startTimeRef.current) {
        elapsedTimeRef.current += performance.now() - startTimeRef.current;
      }
      cancelAnimationFrame(animationRef.current);
      startTimeRef.current = null;
      animationRef.current = null;
    }
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current + elapsedTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      setState(progress);

      if (progress < 1 && animateFnRef.current) {
        animationRef.current = requestAnimationFrame(animateFnRef.current);
      } else if (handleDone) {
        handleDone();
      }
    },
    [duration, handleDone, setState],
  );

  useEffect(() => {
    animateFnRef.current = animate;
  }, [animate]);

  const handleStartOrResume = useCallback(() => {
    if (animationRef.current) {
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cancelAnimation, handleStartOrResume, isPaused]);
};

export default useAnimationFrame;
