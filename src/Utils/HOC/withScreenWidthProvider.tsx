import type { ComponentType } from "react";
import ScreenWidthProvider from "./ScreenWidthProvider";

const withScreenWidthProvider = (Component: ComponentType) => (
  <ScreenWidthProvider>
    <Component />
  </ScreenWidthProvider>
);

export default withScreenWidthProvider;