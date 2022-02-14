const videoElement = document.getElementById('video');
const buttonShow = document.getElementById('button-show');
const buttonSelectArea = document.getElementById('btn-select-area');

let shared = false;

buttonShow.hidden = true;

async function selectMediaStream() {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		shared = mediaStream.active;
		videoElement.srcObject = mediaStream;
		videoElement.onloadedmetadata = () => {
			videoElement.play();
		};
	} catch (error) {
		console.log('> on selectMediaStream function', error);
	}
}

buttonSelectArea.addEventListener('click', () => {
	selectMediaStream().then(() => {
		if (shared) {
			buttonSelectArea.hidden = true;
			buttonShow.hidden = false;
		}
	});
});

buttonShow.addEventListener('click', async () => {
	buttonShow.disabled = true;

	await videoElement.requestPictureInPicture();

	buttonShow.disabled = false;
});
