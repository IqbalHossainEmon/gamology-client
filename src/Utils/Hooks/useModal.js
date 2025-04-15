import { useContext } from 'react';

import { hideModalContext, setModalContext } from '../Contexts/ModalContext';

export default function useModal() {
	return { setContent: useContext(setModalContext), hideModal: useContext(hideModalContext) };
}
