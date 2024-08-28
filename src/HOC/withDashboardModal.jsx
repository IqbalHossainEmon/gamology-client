import { useRef, useState } from 'react';
import {
	DashboardModalContextSetContent,
	DashboardModalContextSetShow,
} from '../Contexts/DashboardModalContext';
import DashboardModal from '../Pages/Dashboard/Components/DashboardBody/Components/DashboardModal/DashboardModal';
import Modal from '../Shared/Modal/Modal/Modal';
import ScreenShadow from '../Shared/ScreenShadow/ScreenShadow';

const withDashboardModal = Component =>
	function InnerComponent(props) {
		const [showModal, setShowModal] = useState(false);
		const [content, setContent] = useState({
			modalTitle: null,
			modalBody: null,
			modalFooter: null,
		});
		const hideEventRef = useRef({
			handleHide: () => {},
		});
		const eventRef = useRef(null);

		if (!eventRef.current) {
			eventRef.current = {
				handleToggleModal: isTrue => {
					if (isTrue) {
						setShowModal(true);
					} else {
						hideEventRef.current.handleHide();
					}
				},
			};
		}
		return (
			<DashboardModalContextSetShow.Provider value={eventRef.current.handleToggleModal}>
				<DashboardModalContextSetContent.Provider value={setContent}>
					<Component {...props}>
						<Modal hideEventRef={hideEventRef} setShow={setShowModal} show={showModal}>
							<DashboardModal content={content} />
						</Modal>
						<ScreenShadow show={showModal} zIndex={3} />
					</Component>
				</DashboardModalContextSetContent.Provider>
			</DashboardModalContextSetShow.Provider>
		);
	};

export default withDashboardModal;
