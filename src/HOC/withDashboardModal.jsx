import { useCallback, useState } from 'react';
import {
    DashboardBodyModalContextSetContent,
    DashboardBodyModalContextSetShow,
} from '../Contexts/DashboardBodyModalContext';
import useAppearDisappear from '../Hooks/useAppearDisappear';
import useDropDownHide from '../Hooks/useDropDownHide';
import DashboardModal from '../Pages/Dashboard/Components/DashboardBody/Components/DashboardModal/DashboardModal';
import Modal from '../Shared/Modal/Modal';
import ScreenShadow from '../Shared/ScreenShadow/ScreenShadow';

const withDashboardModal = Component =>
    function InnerComponent(props) {
        const [showModal, setShowModal] = useState(false);
        const [content, setContent] = useState({ title: null, body: null, footer: null });

        const { show, fadeIn } = useAppearDisappear(showModal);

        const { showMenu, setElement, stopMenu } = useDropDownHide(setShowModal);

        const handleHide = useCallback(() => {
            setShowModal(false);
            stopMenu();
        }, [stopMenu]);

        return (
            <DashboardBodyModalContextSetShow.Provider value={setShowModal}>
                <DashboardBodyModalContextSetContent.Provider value={setContent}>
                    <Component
                        {...props}
                        render={
                            <>
                                {show ? (
                                    <Modal
                                        setShow={setShowModal}
                                        fadeIn={fadeIn}
                                        showMenu={showMenu}
                                        setElement={setElement}
                                        handleHide={handleHide}
                                    >
                                        {innerProps => <DashboardModal {...innerProps} content={content} />}
                                    </Modal>
                                ) : null}
                                <ScreenShadow show={showModal} zIndex={3} />
                            </>
                        }
                    />
                </DashboardBodyModalContextSetContent.Provider>
            </DashboardBodyModalContextSetShow.Provider>
        );
    };

export default withDashboardModal;
