import { useCallback, useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../../Hooks/useAppearDisappear';
import useIsTouchAble from '../../../../../../../Hooks/useIsTouchable';
import useScreenWidth from '../../../../../../../Hooks/useScreenWidth';
import CardDot from '../Components/CardDot/CardDot';

const CardDotContainer = ({ parentRef, ...rest }) => {
    const [dotShow, setDotShow] = useState(false);

    const dotShowRef = useRef(false);
    dotShowRef.current = dotShow;

    const listShowRef = useRef(false);
    const isEventAdded = useRef(false);
    const isOutside = useRef(false);

    const handleShowBtn = useCallback(() => {
        if (!dotShowRef.current) setDotShow(true);
        isOutside.current = false;
    }, []);

    const handleHideBtn = useCallback(() => {
        if (dotShowRef.current && !listShowRef.current) setDotShow(false);
        isOutside.current = true;
    }, []);

    const isTouchAble = useIsTouchAble();
    const screenWidth = useScreenWidth();

    const { show, fadeIn } = useAppearDisappear(dotShow);

    useEffect(() => {
        const parent = parentRef.current;
        const touchable = isTouchAble();

        if (parent && !touchable && !isEventAdded.current) {
            parent.addEventListener('mousemove', handleShowBtn);
            parent.addEventListener('mouseleave', handleHideBtn);
            isEventAdded.current = true;
            if (dotShowRef.current) {
                setDotShow(false);
            }
        } else if (isEventAdded.current && touchable) {
            parent.removeEventListener('mousemove', handleShowBtn);
            parent.removeEventListener('mouseleave', handleHideBtn);
            isEventAdded.current = false;
            setDotShow(true);
        } else if (touchable) {
            setDotShow(true);
        }
        return () => {
            if (parent && isEventAdded.current) {
                parent.removeEventListener('mousemove', handleShowBtn);
                parent.removeEventListener('mouseleave', handleHideBtn);
                isEventAdded.current = false;
            }
        };
    }, [handleHideBtn, handleShowBtn, isTouchAble, parentRef, screenWidth]);

    return (
        show && (
            <CardDot
                {...rest}
                fadeIn={fadeIn}
                listShowRef={listShowRef}
                setParentShow={setDotShow}
                isOutside={isOutside}
            />
        )
    );
};
export default CardDotContainer;
