import type { ComponentType } from "react";
import TooltipProvider from "./TooltipProvider";

const withTooltip = (Component: ComponentType) => (
  <TooltipProvider>
    <Component />
  </TooltipProvider>
);
export default withTooltip;
