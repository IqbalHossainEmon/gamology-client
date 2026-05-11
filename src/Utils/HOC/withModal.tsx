import type { ComponentType } from "react";
import ModalProvider from "./ModalProvider";

const withModal = (Component: ComponentType) => (
  <ModalProvider>
    <Component />
  </ModalProvider>
);

export default withModal;
