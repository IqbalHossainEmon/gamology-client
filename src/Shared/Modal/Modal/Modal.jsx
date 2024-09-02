import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import ModalBody from '../ModalBody/ModalBody';

function Modal({ show: showModal, ...rest }) {
	const { show, fadeIn } = useAppearDisappear(showModal);
	return show && <ModalBody {...rest} fadeIn={fadeIn} />;
}
export default Modal;
