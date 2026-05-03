import { useCallback, useRef, useState, type ComponentType } from "react";

import Toasts from "../../Shared/Toasts/Toasts/Toasts";
import { HideToastContext, SetToastContext } from "../Contexts/ToastContext";

export type Toast = {
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  id: number;
  fadeOut?: boolean;
};

export type HandleSetToast = (toast: Toast) => void;
export type HandleHideToast = (id: number) => void;

const withToast = <P extends object>(Component: ComponentType<P>) =>
  function InnerComponent(props: P) {
    const [toasts, setToasts] = useState([] as Toast[]);

    const toastsRef = useRef<Toast[]>(toasts);

    useCallback(() => {
      toastsRef.current = toasts;
    }, [toasts]);

    const toastIdRef = useRef(0);

    const hideToastAnimation = useCallback((id: number) => {
      const transitionTime = 500; // ms
      setToasts((prevState) => {
        const newState = [...prevState];
        const index = newState.findIndex((toast: Toast) => toast.id === id);

        if (index !== -1 && newState[index]) newState[index].fadeOut = true;
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
        } else if (toastsRef.current[0]) {
          hideToastAnimation(toastsRef.current[0].id);
        }
      },
      [hideToastAnimation],
    );
    const handleSetToast: HandleSetToast = useCallback(
      (toast: Toast) => {
        if (typeof toast === "object") {
          if (!toast.title || !toast.message || !toast.type) {
            return;
          }
        } else {
          return;
        }

        setToasts((prevState) => {
          toastIdRef.current++;

          return [...prevState, { ...toast, id: toastIdRef.current }];
        });

        const toastThreshold = 3; // Maximum number of toasts to show at once

        if (toastsRef.current.length > toastThreshold) {
          for (let i = 0; i < toastsRef.current.length - toastThreshold; i++) {
            const toast = toastsRef.current[i];
            if (toast) {
              hideToastAnimation(toast.id);
            }
          }
        }
        return toastIdRef.current;
      },
      [hideToastAnimation],
    );

    return (
      <SetToastContext.Provider value={handleSetToast}>
        <HideToastContext.Provider value={handleHideToast}>
          <Component {...props} />
          <Toasts toasts={toasts} />
        </HideToastContext.Provider>
      </SetToastContext.Provider>
    );
  };

export default withToast;
