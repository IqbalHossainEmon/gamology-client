import { createContext } from "react";
import type { TooltipInteractionHandlers } from "../HOCs/withTooltip";

const SetTooltipContext = createContext<TooltipInteractionHandlers | undefined>(
  undefined,
);

export default SetTooltipContext;
