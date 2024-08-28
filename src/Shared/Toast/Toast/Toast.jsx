import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import ToastBody from '../ToastBody/ToastBody';

function Toast({ show: toastShow, handleHide }) {
	const { show, fadeIn } = useAppearDisappear(toastShow);
	return show && <ToastBody fadeIn={fadeIn} handleHide={handleHide} />;
}
export default Toast;
