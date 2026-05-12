import { useCallback, useEffect, useRef, type RefObject } from "react";

import useTooltip from "./useTooltip";
import type { Direction } from "../Types/direction";

interface Tooltip {
  container: HTMLElement | null;
  message: string;
  position: Direction | null;
}

const useHoverTooltips = (
  element: RefObject<HTMLElement>,
  outerMessage: string,
  conditionCheckFunction: (() => boolean) | null = null,
  outerPosition: Direction = "left",
) => {
  const setTooltip = useTooltip();

  const tooltipsInfos = useRef<Tooltip>({
    container: null,
    message: "",
    position: null,
  });

  const prevElements = useRef<Tooltip>({
    container: null,
    message: "",
    position: null,
  });

  const handleHideRef = useRef<(element: HTMLElement) => void>(null);

  const onMouseEnter = useCallback(() => {
    const { container, message, position } = tooltipsInfos.current;
    const {
      container: prevContainer,
      message: prevMessage,
      position: prevPosition,
    } = prevElements.current;
    if (
      prevContainer !== container ||
      prevMessage !== message ||
      prevPosition !== position
    ) {
      if (!setTooltip || !container || !message || !position) return;
      handleHideRef.current = setTooltip({ container, message, position });
      prevElements.current = {
        container: tooltipsInfos.current.container,
        message: tooltipsInfos.current.message,
        position: tooltipsInfos.current.position,
      };
    }
  }, [setTooltip]);

  const onMouseLeave = useCallback(() => {
    const { container } = tooltipsInfos.current;
    if (handleHideRef.current && container) {
      handleHideRef.current(container);
      handleHideRef.current = null;
      prevElements.current = {
        container: null,
        message: "",
        position: null,
      };
    }
  }, []);

  useEffect(() => {
    if (conditionCheckFunction && !conditionCheckFunction()) {
      const ele = element.current;

      tooltipsInfos.current.container = element.current;
      tooltipsInfos.current.message = outerMessage;
      tooltipsInfos.current.position = outerPosition;

      ele.addEventListener("mouseenter", onMouseEnter);
      ele.addEventListener("mouseleave", onMouseLeave);

      return () => {
        ele.removeEventListener("mouseenter", onMouseEnter);
        ele.removeEventListener("mouseleave", onMouseLeave);
      };
    }
    return () => {};
  }, [
    conditionCheckFunction,
    element,
    outerMessage,
    onMouseEnter,
    outerPosition,
    onMouseLeave,
  ]);
};

export default useHoverTooltips;
