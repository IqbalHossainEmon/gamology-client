import {
  useCallback,
  useRef,
  useState,
  type ComponentType,
  type RefObject,
} from "react";

import Tooltips from "../../Shared/Tooltips/Tooltips/Tooltips";
import SetTooltipContext from "../Contexts/TooltipContext";

type TooltipRefValue = {
  container: HTMLElement;
  message: string;
  preferPosition?: "top" | "bottom" | "left" | "right";
};

type Tooltip = TooltipRefValue & {
  id: number;
  show: boolean;
};

export type TooltipInteractionHandlers = ({
  current,
}: RefObject<TooltipRefValue>) => (container: HTMLElement) => void;

const withTooltip = <T extends object>(Component: ComponentType<T>) =>
  function InnerComponent(props: T) {
    const [tooltips, setTooltips] = useState<Tooltip[]>([]);
    const timeIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const idRef = useRef(0);
    const elementOnHideListRef = useRef<
      { container: HTMLElement; timerId: ReturnType<typeof setTimeout> }[]
    >([]);

    const handleCheckAndDelete = useCallback(() => {
      if (timeIdRef.current) {
        clearTimeout(timeIdRef.current);
      }

      timeIdRef.current = setTimeout(() => {
        setTooltips((prev) => prev.filter((element) => element.show));
        timeIdRef.current = null;
      }, 300);
    }, []);

    const hideTooltip = useCallback(
      (container: HTMLElement) => {
        const bundle = {
          container,
          timerId: setTimeout(() => {
            elementOnHideListRef.current.filter(
              (t) => t.container !== container,
            );

            setTooltips((prev) => {
              const index = prev.findIndex((t) => t.container === container);
              if (index > -1 && prev[index]) {
                prev[index].show = false;
              }
              return [...prev];
            });
          }, 200),
        };
        elementOnHideListRef.current.push(bundle);

        handleCheckAndDelete();
      },
      [handleCheckAndDelete],
    );

    const tooltipInteractionHandlers: TooltipInteractionHandlers = useCallback(
      ({ current }) => {
        const { container, message, preferPosition } = current;

        const doesNeedToHide = elementOnHideListRef.current.find(
          (tooltip) => tooltip.container === container,
        );

        if (doesNeedToHide) {
          clearTimeout(doesNeedToHide.timerId);
          elementOnHideListRef.current = elementOnHideListRef.current.filter(
            (tooltip) => tooltip.container !== container,
          );
        }

        setTooltips((prev) => {
          const index = prev.findIndex((t) => t.container === container);

          if (index > -1)
            return prev.map((tooltip, i) =>
              i === index
                ? {
                    id: tooltip.id,
                    container,
                    show: true,
                    message,
                    preferPosition,
                  }
                : tooltip,
            );

          return [
            ...prev,
            {
              id: idRef.current++,
              container,
              show: true,
              message,
              preferPosition,
            },
          ];
        });

        return hideTooltip;
      },
      [hideTooltip],
    );

    return (
      <SetTooltipContext.Provider value={tooltipInteractionHandlers}>
        <Component {...props} />
        <Tooltips tooltips={tooltips} />
      </SetTooltipContext.Provider>
    );
  };

export default withTooltip;
