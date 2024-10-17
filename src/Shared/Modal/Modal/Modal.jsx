import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import ModalBody from '../ModalBody/ModalBody';

function Modal({ show: state, ...rest }) {
	const [show, fadeIn] = useAppearDisappear(state);
	return show && <ModalBody {...rest} fadeIn={fadeIn} />;
}
export default Modal;
