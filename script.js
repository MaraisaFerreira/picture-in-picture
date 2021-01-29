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
	/* On Load */
	selectMediaStream().then(() => {
		if (shared) {
			/* esconde o btn SelectArea e exibe o btn Show   */
			buttonSelectArea.hidden = true;
			buttonShow.hidden = false;
		}
	});
});

buttonShow.addEventListener('click', async () => {
	/* desabitita o btn */
	buttonShow.disabled = true;

	/* inicia o picture in picture */
	await videoElement.requestPictureInPicture();

	/* reabilita o btn show */
	buttonShow.disabled = false;
});
