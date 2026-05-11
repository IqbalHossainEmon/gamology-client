import { useCallback, useEffect, useRef, useState } from "react";

import Modal from "../../Shared/Modal/Modal/Modal";
import ScreenShadow from "../../Shared/ScreenShadow/ScreenShadow";
import { HideModalContext, SetModalContext } from "../Contexts/ModalContext";
import useChangeBodyOverflow from "../Hooks/useChangeBodyOverflow";

export interface ModalContent {
  title: string | null;
  body: string | React.ReactNode | null;
  footer?: string | React.ReactNode | null;
  parentElement?: HTMLElement | null;
  originPoint?: {
    top: number;
    left: number;
  } | null;
  e?: React.MouseEvent;
}

const emptyModal: ModalContent = {
  title: null,
  body: null,
  footer: null,
  parentElement: null,
};

export type SetModalContextType = (value: ModalContent) => void;
export type HideModalContextType = () => void;

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<ModalContent>(emptyModal);
  const [show, setShow] = useState(false);
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { hideBodyOverflow, showBodyOverflow } = useChangeBodyOverflow();

  const handleKeyDownRef = useRef<(event: KeyboardEvent) => void>(null);

  const handleHide = useCallback(() => {
    if (timerIdRef.current !== null) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    setShow(false);
    timerIdRef.current = setTimeout(() => {
      showBodyOverflow();
      setContent(emptyModal);
      timerIdRef.current = null;
    }, 200);
  }, [showBodyOverflow]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleHide();
        document.removeEventListener("keydown", handleKeyDownRef.current);
      }
    },
    [handleHide],
  );

  useEffect(() => {
    handleKeyDownRef.current = handleKeyDown;
  }, [handleKeyDown]);

  const hideModal: HideModalContextType = useCallback(() => {
    handleHide();
    document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown, handleHide]);

  const handleSetContent: SetModalContextType = useCallback(
    (value: ModalContent) => {
      const hasContent = (
        value: string | React.ReactNode | null | undefined,
      ): boolean => value !== null && value !== undefined && value !== "";

      if (hasContent(value.title) && hasContent(value.body)) {
        const { e } = value;

        if (e) {
          const { pageX, pageY } = e;
          value.originPoint = {
            top: pageY,
            left: pageX,
          };
        }

        setShow(true);
        hideBodyOverflow();
        setContent(value);

        document.addEventListener("keydown", handleKeyDown);
      }
    },
    [handleKeyDown, hideBodyOverflow],
  );

  return (
    <SetModalContext.Provider value={handleSetContent}>
      <HideModalContext.Provider value={hideModal}>
        {children}
        <Modal content={content} show={show} hideModal={hideModal} />
        <ScreenShadow show={show} zIndex={3} />
      </HideModalContext.Provider>
    </SetModalContext.Provider>
  );
};

export default ModalProvider;
