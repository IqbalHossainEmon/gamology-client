import useAppearDisappear from '../../../../Hooks/useAppearDisappear';
import ToastBody from '../ToastBody/ToastBody/ToastBody';

function Toast({ show: toastShow, fadeOut, ...rest }) {
	const { show, fadeIn } = useAppearDisappear(toastShow, true);

	return show && <ToastBody fadeIn={fadeIn && !fadeOut} {...rest} />;
}
export default Toast;
