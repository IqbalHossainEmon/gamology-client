import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Toasts from "../../Shared/Toasts/Toasts/Toasts";
import { HideToastContext, SetToastContext } from "../Contexts/ToastContext";

export interface Toast {
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  id: number;
  fadeOut?: boolean;
}

export type HandleSetToast = (toast: Toast) => number | undefined;
export type HandleHideToast = (id: number) => void;

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState([] as Toast[]);

  const toastsRef = useRef<Toast[]>(toasts);

  useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  const toastIdRef = useRef(0);

  const hideToastAnimation = useCallback((id: number) => {
    const transitionTime = 500; // ms
    setToasts((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((toast: Toast) => toast.id === id);

      if (index !== -1) newState[index].fadeOut = true;
      return newState;
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, transitionTime);
  }, []);

  const handleHideToast: HandleHideToast = useCallback(
    (id: number) => {
      if (id) {
        hideToastAnimation(id);
      } else {
        hideToastAnimation(toastsRef.current[0].id);
      }
    },
    [hideToastAnimation],
  );
  const handleSetToast: HandleSetToast = useCallback(
    (toast: Toast) => {
      if (typeof toast !== "object" || !toast.title || !toast.message) {
        return undefined;
      }

      setToasts((prevState) => {
        toastIdRef.current++;

        return [...prevState, { ...toast, id: toastIdRef.current }];
      });

      const toastThreshold = 3; // Maximum number of toasts to show at once

      if (toastsRef.current.length > toastThreshold) {
        for (let i = 0; i < toastsRef.current.length - toastThreshold; i++) {
          const t = toastsRef.current[i];
          hideToastAnimation(t.id);
        }
      }
      return toastIdRef.current;
    },
    [hideToastAnimation],
  );

  return (
    <SetToastContext.Provider value={handleSetToast}>
      <HideToastContext.Provider value={handleHideToast}>
        {children}
        <Toasts toasts={toasts} />
      </HideToastContext.Provider>
    </SetToastContext.Provider>
  );
};

export default ToastProvider;
