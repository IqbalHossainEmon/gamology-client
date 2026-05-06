import { useEffect } from "react";

const useReloadScroll = () => {
  useEffect(() => {
    const root = document.getElementById("root");

    const handleLoad = () => {
      setTimeout(() => {
        const loadScroll = localStorage.getItem("loadScroll");
        if (loadScroll && root) {
          const parsedScroll = JSON.parse(loadScroll);
          if (window.location.pathname === parsedScroll.path) {
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
