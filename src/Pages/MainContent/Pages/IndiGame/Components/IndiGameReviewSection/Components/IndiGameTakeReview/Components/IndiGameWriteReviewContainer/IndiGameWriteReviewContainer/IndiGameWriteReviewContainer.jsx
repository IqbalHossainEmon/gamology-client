import useAppearDisappear from '../../../../../../../../../../../Hooks/useAppearDisappear';
import IndiGameWriteReview from '../Components/IndiGameWriteReview/IndiGameWriteReview/IndiGameWriteReview';

function IndiGameWriteReviewContainer({ state, ...rest }) {
	const { show, fadeIn } = useAppearDisappear(state);

	return show && <IndiGameWriteReview fadeHeight={fadeIn} {...rest} />;
}
export default IndiGameWriteReviewContainer;
