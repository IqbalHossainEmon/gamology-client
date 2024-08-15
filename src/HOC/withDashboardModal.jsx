import { useRef, useState } from 'react';
import {
	DashboardBodyModalContextSetContent,
	DashboardBodyModalContextSetShow,
} from '../Contexts/DashboardBodyModalContext';
import useAppearDisappear from '../Hooks/useAppearDisappear';
import DashboardModal from '../Pages/Dashboard/Components/DashboardBody/Components/DashboardModal/DashboardModal';
import Modal from '../Shared/Modal/Modal';
import ScreenShadow from '../Shared/ScreenShadow/ScreenShadow';

const withDashboardModal = Component =>
	function InnerComponent(props) {
		const [showModal, setShowModal] = useState(false);
		const [content, setContent] = useState({
			modalTitle: null,
			modalBody: null,
			modalFooter: null,
		});

		const { show, fadeIn } = useAppearDisappear(showModal);
		const hideEventRef = useRef({
			handleHide: () => {},
		});

		const eventRef = useRef(null);

		if (!eventRef.current) {
			eventRef.current = {
				handleShowHide: isTrue => {
					if (isTrue) {
						setShowModal(true);
					} else {
						hideEventRef.current.handleHide();
					}
				},
			};
		}
		return (
			<DashboardBodyModalContextSetShow.Provider value={eventRef.current.handleShowHide}>
				<DashboardBodyModalContextSetContent.Provider value={setContent}>
					<Component
						{...props}
						render={
							<>
								{show ? (
									<Modal
										setShow={setShowModal}
										fadeIn={fadeIn}
										hideEventRef={hideEventRef}
									>
										<DashboardModal content={content} />
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
