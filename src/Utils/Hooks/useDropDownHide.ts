import { useCallback, useEffect, useRef } from "react";

const useDropDownHide = (
  setState: (val: boolean, e: FocusEvent | MouseEvent) => void,
) => {
  const element = useRef<HTMLElement | HTMLElement[]>(null);
  const listenersAttachedRef = useRef(false);
  const handlersRef = useRef<{
    clickOutside?: (e: MouseEvent) => void;
    blur?: (e: FocusEvent) => void;
  }>({});

  const removeEvents = useCallback(() => {
    if (
      listenersAttachedRef.current &&
      handlersRef.current.clickOutside &&
      handlersRef.current.blur
    ) {
      document.removeEventListener("click", handlersRef.current.clickOutside);
      window.removeEventListener("blur", handlersRef.current.blur);
      listenersAttachedRef.current = false;
    }
  }, []);

  useEffect(() => {
    handlersRef.current.clickOutside = (e) => {
      const { current } = element;
      const target = e.target instanceof Node ? e.target : null;
      if (!current) return;

    console.log(current)

      const clickedOutside = Array.isArray(current)
        ? !current.some((ele) => ele.contains(target))
        : current && !current.contains(target);

      if (clickedOutside && listenersAttachedRef.current) {
        setState(false, e);
        removeEvents();
      }
    };

    handlersRef.current.blur = (e) => {
      if (listenersAttachedRef.current) {
        setState(false, e);
        removeEvents();
      }
    };
  }, [removeEvents, setState]);

  useEffect(() => {
    const handlers = handlersRef.current;

    return () => {
      if (
        listenersAttachedRef.current &&
        handlers.clickOutside &&
        handlers.blur
      ) {
        document.removeEventListener("click", handlers.clickOutside);
        window.removeEventListener("blur", handlers.blur);
      }
    };
  }, []);

  const showMenu = useCallback(() => {
    console.log("showMenu called");
    if (
      !listenersAttachedRef.current &&
      handlersRef.current.clickOutside &&
      handlersRef.current.blur
    ) {
      console.log("Attaching event listeners");
      document.addEventListener("click", handlersRef.current.clickOutside);
      window.addEventListener("blur", handlersRef.current.blur);
      listenersAttachedRef.current = true;
    }
  }, []);

  const setElement = useCallback((ele: HTMLElement | HTMLLIElement[]) => {
    element.current = ele;
  }, []);

  return {
    showMenu,
    setElement,
    removeEvents,
  };
};

export default useDropDownHide;
