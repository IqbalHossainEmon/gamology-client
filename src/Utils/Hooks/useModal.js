import { useContext } from 'react';
import ModalContext from '../Contexts/ModalContext';

export default function useModal() {
	return useContext(ModalContext);
}
