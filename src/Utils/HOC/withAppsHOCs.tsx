import { type ComponentType } from "react";

import withModal from "./withModal";
import withScreenWidthProvider from "./withScreenWidthProvider";
import withToast from "./withToast";
import withTooltip from "./withTooltip";

const withAppsHOCs = (Component: ComponentType) =>
  withScreenWidthProvider(withTooltip(withModal(withToast(Component))));

export default withAppsHOCs;
