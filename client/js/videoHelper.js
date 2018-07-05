function getType (src) {
    return src.split('.').pop();
}

export default function addSourceToVideo(src) {
    const source = document.createElement('source');

    source.src = src;
    source.type = 'video/' + getType(src); // make this more generic

    const videoRef = document.getElementById('embedded_video');
    videoRef.appendChild(source);
}