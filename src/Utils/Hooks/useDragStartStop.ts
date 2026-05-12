import { useCallback, useEffect, useRef } from "react";
import isTouchAble from "../Lib/isTouchable";

type OnStop = (e: MouseEvent | TouchEvent | FocusEvent) => void;

type OnStart = (e: MouseEvent | TouchEvent) => void;

const useDragStartStop = (
  moveEvent: (e: MouseEvent | TouchEvent) => void,
  handleMouseUp?: (e: MouseEvent | TouchEvent | FocusEvent) => void,
  grab?: boolean,
) => {
  const isTouchEvenAdded = useRef(false);
  const onStopRef = useRef<OnStop>(null);

  const onStop: OnStop = useCallback(
    (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }

      if (!onStopRef.current) return;

      if (isTouchEvenAdded.current) {
        document.removeEventListener("touchmove", moveEvent);
        document.removeEventListener("touchend", onStopRef.current);
        isTouchEvenAdded.current = false;
      } else {
        document.removeEventListener("mousemove", moveEvent);
        document.removeEventListener("mouseup", onStopRef.current);
      }

      window.removeEventListener("blur", onStopRef.current);

      if (handleMouseUp) {
        handleMouseUp(e);
      }

      const root = document.querySelector("#root");

      if (root?.classList.contains("grabbing") === true)
        root.classList.remove("grabbing");
    },
    [handleMouseUp, moveEvent],
  );

  useEffect(() => {
    onStopRef.current = onStop;
  }, [onStop]);

  const onStart: OnStart = useCallback(
    (e) => {
      if (e.defaultPrevented) {
        e.preventDefault();
      }
      const touchAble = isTouchAble();

      window.addEventListener("blur", onStop);
      if (touchAble) {
        document.addEventListener("touchmove", moveEvent);
        document.addEventListener("touchend", onStop);
        isTouchEvenAdded.current = true;
      } else {
        document.addEventListener("mousemove", moveEvent);
        document.addEventListener("mouseup", onStop);
      }

      const root = document.querySelector("#root");

      if (touchAble && grab === true && root) {
        root.classList.add("grabbing");
      }
    },
    [grab, moveEvent, onStop],
  );

  return onStart;
};

export default useDragStartStop;
