import { useCallback, useEffect, useRef, useState } from "react";

import useAppearDisappear from "../../../../../../../../Utils/Hooks/useAppearDisappear";
import useDropDownHide from "../../../../../../../../Utils/Hooks/useDropDownHide";
import useIsTouchAble from "../../../../../../../../Utils/Hooks/useIsTouchable";
import CardDotList from "../CardDotList/CardDotList";

import styles from "./CardDotBody.module.css";

const isMouseOverElement = (
  element: HTMLElement,
  e: MouseEvent | FocusEvent,
) => {
  if (!element) {
    return;
  }
  if (e instanceof FocusEvent) {
    const { relatedTarget } = e;
    if (!relatedTarget || !(relatedTarget instanceof Node)) {
      return false;
    }
    return element.contains(relatedTarget);
  }

  const mouseX = e.clientX || 0;
  const mouseY = e.clientY || 0;

  const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
  return element.contains(elementUnderMouse);
};

function CardDotBody({ item, lists, parentRef, fadeIn, setParentShow }) {
  const [listShow, setListShow] = useState(false);

  const fadeInRef = useRef(fadeIn);
  useEffect(() => {
    fadeInRef.current = fadeIn;
  }, [fadeIn]);

  const btnRef = useRef<HTMLButtonElement>(null);

  const isTouchAble = useIsTouchAble();

  const handleHide = useCallback(
    (state: boolean, e: MouseEvent | FocusEvent) => {
      setListShow(state);
      if (!isMouseOverElement(parentRef.current, e) && !isTouchAble()) {
        setParentShow(state);
      }
    },
    [setParentShow, parentRef, isTouchAble],
  );

  const { setElement, showMenu, removeEvents } = useDropDownHide(handleHide);

  const [show, childFadeIn] = useAppearDisappear(listShow, false);

  const onClick = () => {
    setListShow((prev) => {
      if (prev) {
        removeEvents();
      }
      return !prev;
    });
  };
  const onAppear = useCallback(
    (element: HTMLElement) => {
      setElement(element);
      showMenu();
    },
    [setElement, showMenu],
  );

  return (
    <div className={styles.cardDots}>
      <button
        ref={btnRef}
        className={`${styles.btnDot}${fadeIn || listShow ? ` ${styles.zoomIn}` : ""}`}
        onClick={onClick}
        type="button"
      >
        <svg
          enableBackground="new 0 0 32 32"
          fill="#ffffff"
          version="1.1"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g strokeWidth="0" />
          <g strokeLinecap="round" strokeLinejoin="round" />
          <g>
            <circle cx="16" cy="16" fill="#F08A5D" r="2" />
            <circle cx="16" cy="26" fill="#B83B5E" r="2" />
            <circle cx="16" cy="6" fill="#B83B5E" r="2" />
          </g>
        </svg>
      </button>
      {show && (
        <CardDotList
          fadeIn={childFadeIn}
          onAppear={onAppear}
          item={item}
          lists={lists}
          setHide={handleHide}
          btnRef={btnRef}
          parentRef={parentRef}
          onHide={removeEvents}
          setListShow={setListShow}
          setParentShow={setParentShow}
        />
      )}
    </div>
  );
}

export default CardDotBody;
