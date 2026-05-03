import { useContext } from "react";

import { HideModalContext, SetModalContext } from "../Contexts/ModalContext";

export default function useModal() {
  return {
    setContent: useContext(SetModalContext),
    hideModal: useContext(HideModalContext),
  };
}
