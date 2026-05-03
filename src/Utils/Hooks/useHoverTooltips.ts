import { useCallback, useEffect, useRef, type RefObject } from "react";

import useTooltip from "./useTooltip";
import type { Direction } from "../Types/directoin";

type Tooltip = {
  container: HTMLElement | null;
  message: string;
  position: Direction | null;
};

const useHoverTooltips = (
  element: RefObject<HTMLElement>,
  message: string,
  conditionCheckFunction: (() => boolean) | null = null,
  position: Direction = "left",
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

  const onMouseLeave = () => {
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
  };

  useEffect(() => {
    if (!element.current) {
      return;
    }

    if (conditionCheckFunction && !conditionCheckFunction()) {
      return;
    }

    const ele = element.current;

    tooltipsInfos.current.container = element.current;
    tooltipsInfos.current.message = message;
    tooltipsInfos.current.position = position;

    if (ele) {
      ele.addEventListener("mouseenter", onMouseEnter);
      ele.addEventListener("mouseleave", onMouseLeave);

      return () => {
        ele.removeEventListener("mouseenter", onMouseEnter);
        ele.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [conditionCheckFunction, element, message, onMouseEnter, position]);
};

export default useHoverTooltips;
