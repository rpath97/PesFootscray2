

function videoPlayerDash(videoUrl) {
    // //OPENING VIDEO FRAME
    // //setting previous and current page
    previous_page = current_page;
    current_page = "video-frame";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'block';

    const videoSrcFrame = document.getElementById('video-src-iframe');

    const player = videojs('video-frame', {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true
    });
    const videoSrc = {
        hls: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', // Sample HLS stream
        dash: videoUrl // Sample DASH stream
    };

    // Check if browser supports HLS or DASH
    if (videojs.browser.IS_SAFARI) {
        player.src({ src: videoSrc.hls, type: 'application/x-mpegURL' });
    } else {
        player.src({ src: videoSrc.dash, type: 'application/dash+xml' });
    }
}
// MP4 VIDEO PLAYING FUNCTION
function videoPlayerMp4(videoUrl) {
    //setting virtual keys
    setVideoKeys();

    // //OPENING VIDEO FRAME
    // //setting previous and current page
    previous_page = current_page;
    current_page = "video-frame";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'block';

    document.addEventListener("keyup", handleKeyUp);

    // const videoSrcFrame = document.getElementById('video-src-iframe');
    const videoElement = document.getElementById(current_page);
    if (videoElement) {
        //videoSrcFrame.style.display = 'flex';
        // var hls = new Hls();
        // hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
        // hls.attachMedia(videoElement);
        // hls.on(Hls.Events.MANIFEST_PARSED, function () {
        //     video.play();
        // });
        videoElement.src = videoUrl;  //d the welcome video and activated the dashbo
        videoElement.load(); // Reload the video element
        videoElement.play();
        //videoElement.addEventListener("ended", backTemp());
    }
}
// HLS VIDEO PLAYING FUCNTION
function videoPlayerHls(videoUrl) {
    //setting virtual keys
    setVideoKeys();

    //OPENING VIDEO FRAME
    //setting previous and current page
    previous_page = current_page;
    current_page = "video-frame";
    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'block';
    document.addEventListener("keyup", handleKeyUp);
    // const videoSrcFrame = document.getElementById('video-src-iframe');
    const videoElement = document.getElementById(current_page);
    if (videoElement) {
        //videoSrcFrame.style.display = 'flex';
        var hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
        // videoSrcFrame.src = videoLocalFileSrc;  //d the welcome video and activated the dashbo
        // videoElement.load(); // Reload the video element
        // videoElement.play();
        //videoElement.addEventListener("ended", backTemp());
    }
}