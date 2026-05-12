import { useEffect, useRef, useState } from "react";

import useScreenWidth from "../../../../../../../Utils/Hooks/useScreenWidth";
import CardDotBody from "../Components/CardDotBody/CardDotBody";
import isTouchAble from "../../../../../../../Utils/Lib/isTouchable";

function CardDot({ parentRef, item, lists }) {
  const [dotShow, setDotShow] = useState(false);
  const dotShowRef = useRef(false);
  dotShowRef.current = dotShow;

  const isEventAdded = useRef(false);
  const eventRef = useRef(null);

  if (!eventRef.current) {
    eventRef.current = {
      handleShowBtn: () => {
        if (!dotShowRef.current) {
          setDotShow(true);
        }
      },
      handleHideBtn: () => {
        if (dotShowRef.current) {
          setDotShow(false);
        }
      },
    };
  }

  const { widthInRem, heightInRem } = useScreenWidth();

  useEffect(() => {
    const parent = parentRef.current;

    const touchable = isTouchAble();

    if (parent && !touchable && !isEventAdded.current) {
      parent.addEventListener("mouseover", eventRef.current.handleShowBtn);
      parent.addEventListener("mouseleave", eventRef.current.handleHideBtn);
      isEventAdded.current = true;
      if (dotShowRef.current) {
        setDotShow(false);
      }
    } else if (isEventAdded.current && touchable) {
      parent.removeEventListener("mouseover", eventRef.current.handleShowBtn);
      parent.removeEventListener("mouseleave", eventRef.current.handleHideBtn);
      isEventAdded.current = false;
      setDotShow(true);
    } else if (touchable) {
      setDotShow(true);
    }

    if (parent) {
      parent.addEventListener("focus", eventRef.current.handleShowBtn, true);
      parent.addEventListener("blur", eventRef.current.handleHideBtn, true);
    }

    return () => {
      if (parent && isEventAdded.current) {
        parent.removeEventListener("mouseover", eventRef.current.handleShowBtn);
        parent.removeEventListener(
          "mouseleave",
          eventRef.current.handleHideBtn,
        );
        isEventAdded.current = false;
      }
    };
  }, [parentRef, widthInRem, heightInRem]);

  return (
    <CardDotBody
      item={item}
      lists={lists}
      fadeIn={dotShow}
      setParentShow={setDotShow}
      parentRef={parentRef}
    />
  );
}
export default CardDot;
