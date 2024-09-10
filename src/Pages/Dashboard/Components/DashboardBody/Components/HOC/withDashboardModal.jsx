import { useRef, useState } from 'react';
import Modal from '../../../../../../Shared/Modal/Modal/Modal';
import ScreenShadow from '../../../../../../Shared/ScreenShadow/ScreenShadow';
import {
	SetContentDashboardModalContext,
	SetDashboardModalContext,
} from '../Contexts/DashboardModalContext';
import DashboardModal from '../DashboardModal/DashboardModal';

const withDashboardModal = Component =>
	function InnerComponent(props) {
		const [showModal, setShowModal] = useState(false);
		const [content, setContent] = useState({
			modalTitle: null,
			modalBody: null,
			modalFooter: null,
		});
		const hideEventRef = useRef(null);
		const eventRef = useRef(null);

		if (!eventRef.current) {
			eventRef.current = {
				handleToggleModal: isTrue => {
					if (isTrue) {
						setShowModal(true);
					} else {
						hideEventRef.current();
					}
				},
			};
		}
		return (
			<SetDashboardModalContext.Provider value={eventRef.current.handleToggleModal}>
				<SetContentDashboardModalContext.Provider value={setContent}>
					<Component {...props}>
						<Modal hideEventRef={hideEventRef} setShow={setShowModal} show={showModal}>
							<DashboardModal content={content} />
						</Modal>
						<ScreenShadow show={showModal} zIndex={3} />
					</Component>
				</SetContentDashboardModalContext.Provider>
			</SetDashboardModalContext.Provider>
		);
	};

export default withDashboardModal;
