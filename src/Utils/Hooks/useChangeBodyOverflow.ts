import { useCallback, useRef } from "react";
import isTouchAble from "../Lib/isTouchable";

export default function useChangeBodyOverflow() {
  const root = useRef(document.querySelector("#root"));

  const isAddedRef = useRef(false);
  const isPaddingAddedRef = useRef(false);

  const checkForTouchScreen = useCallback(() => {
    if (!root.current) throw new Error("Root element not found");

    if (isPaddingAddedRef.current && isTouchAble()) {
      root.current.classList.remove("scrollbar-replace-padding");
      isPaddingAddedRef.current = false;
    } else if (!isPaddingAddedRef.current && !isTouchAble()) {
      root.current.classList.add("scrollbar-replace-padding");
      isPaddingAddedRef.current = true;
    }
  }, []);

  const hideBodyOverflow = useCallback(() => {
    if (!root.current) throw new Error("Root element not found");

    if (root.current.scrollHeight > root.current.clientHeight) {
      root.current.classList.add("overflow-y-hidden");
      window.addEventListener("resize", checkForTouchScreen);

      if (!isTouchAble()) {
        root.current.classList.add("scrollbar-replace-padding");
        isPaddingAddedRef.current = true;
      }

      isAddedRef.current = true;
    }
  }, [checkForTouchScreen]);

  const showBodyOverflow = useCallback(() => {
    if (!root.current) throw new Error("Root element not found");

    if (isAddedRef.current) {
      root.current.classList.remove("overflow-y-hidden");
      window.removeEventListener("resize", checkForTouchScreen);

      if (isPaddingAddedRef.current) {
        root.current.classList.remove("scrollbar-replace-padding");
        isPaddingAddedRef.current = false;
      }

      isAddedRef.current = false;
    }
  }, [checkForTouchScreen]);

  return {
    hideBodyOverflow,
    showBodyOverflow,
  };
}
