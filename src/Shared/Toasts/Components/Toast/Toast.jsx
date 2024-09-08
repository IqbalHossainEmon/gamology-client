import useAppearDisappear from '../../../../Hooks/useAppearDisappear';
import ToastBody from '../ToastBody/ToastBody/ToastBody';

function Toast({ show: toastShow, ...rest }) {
	const { show, fadeIn } = useAppearDisappear(toastShow, true);

	return show && <ToastBody fadeIn={fadeIn} {...rest} />;
}
export default Toast;
