import type { ComponentType } from "react";
import ToastProvider from "./ToastProvider";

const withToast = (Component: ComponentType) => (
  <ToastProvider>
    <Component />
  </ToastProvider>
);

export default withToast;
