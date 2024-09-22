import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import ErrorMessageBody from '../ErrorMessageBody/ErrorMessageBody';

function ErrorMessage({ errorMessage, enable }) {
	const [show, fadeIn] = useAppearDisappear(enable);

	return show && <ErrorMessageBody errorMessage={errorMessage} fadeIn={fadeIn} />;
}
export default ErrorMessage;
