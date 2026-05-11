import { createContext } from "react";
import type { TooltipInteractionHandlers } from "../HOC/TooltipProvider";

const SetTooltipContext = createContext<TooltipInteractionHandlers | undefined>(
  undefined,
);

export default SetTooltipContext;
