const handleFullScreen = ref => {
	if (document.fullscreenElement) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}

		return;
	}
	if (ref.requestFullscreen) {
		ref.requestFullscreen();
	} else if (ref.webkitRequestFullscreen) {
		ref.webkitRequestFullscreen();
	} else if (ref.mozRequestFullScreen) {
		ref.mozRequestFullScreen();
	} else if (ref.msRequestFullscreen) {
		ref.msRequestFullscreen();
	}
};

export default function useFullScreenLogic() {
	return handleFullScreen;
}
