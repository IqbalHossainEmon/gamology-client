import { useEffect } from "react";

interface LoadScroll {
  scroll: number;
  path: string;
}

const parseLoadScroll = (raw: string): LoadScroll | null => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "path" in parsed &&
      "scroll" in parsed &&
      typeof parsed.path === "string" &&
      typeof parsed.scroll === "number"
    ) {
      return { path: parsed.path, scroll: parsed.scroll };
    }
  } catch {
    // fall through
  }
  return null;
};

const useReloadScroll = () => {
  useEffect(() => {
    const root = document.querySelector("#root");

    const handleLoad = () => {
      setTimeout(() => {
        const loadScroll = localStorage.getItem("loadScroll");
        if (loadScroll !== null && root) {
          const parsedScroll = parseLoadScroll(loadScroll);
          if (parsedScroll && window.location.pathname === parsedScroll.path) {
            root.scrollTo(0, parsedScroll.scroll);
          }
          localStorage.removeItem("loadScroll");
        }
      }, 500);
    };

    const handleBeforeUnload = () => {
      if (root)
        localStorage.setItem(
          "loadScroll",
          JSON.stringify({
            scroll: root.scrollTop,
            path: window.location.pathname,
          }),
        );
    };

    window.addEventListener("load", handleLoad);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useReloadScroll;
