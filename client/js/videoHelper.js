import 'mediaelement';

export let player = null;

function recreateVideoDomElement() {
    $('#video').append('<video id="embedded_video"></video>')
}

function removeDomElements() {
    $('#video').empty();
}

export default function addSourceToVideo(src) {

    console.log('player1', player);

    if (player) {
        removeDomElements();
        recreateVideoDomElement();
    }

    player = new MediaElementPlayer('embedded_video', {

        stretching: 'fill',
        hideVideoControlsOnLoad: true,
        hideVideoControlsOnPause: true,

        success: function(mediaelement, originalNode) {
            mediaelement.setSrc(src);
            mediaelement.load();
            console.log('success')
        },
        error: function(media) {
            console.log('error', media);
        }
    });

    console.log('player2', player);
}