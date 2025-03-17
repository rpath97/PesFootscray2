// Hospital Information card click handlers
const videHlsSrcTest = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
function handleWelcomeClick() {
    console.log('Opening Welcome Video in new window...');

    //OPENING VIDEO FRAME
    //setting previous and current page
    previous_page = current_page;
    current_page = "video-frame";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'block';

    const videoSrcFrame = document.getElementById('video-src-iframe');
    const videoElement = document.getElementById(current_page);
    if (videoSrcFrame) {
        //videoSrcFrame.style.display = 'flex';
        var hls = new Hls();
        hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
        // videoSrcFrame.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';  //d the welcome video and activated the dashbo
        // videoElement.load(); // Reload the video element
        // videoElement.play();
        // videoElement.addEventListener("ended", backTemp());
    }
    
    // Calculate center position for the new window
    const width = 1280;  // Video window width
    const height = 720;  // Video window height
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    // // Open video file directly in new window
    // const videoWindow = window.open('', 'Welcome to Country', 
    //     `width=${width},
    //      height=${height},
    //      left=${left},
    //      top=${top},
    //      resizable=yes,
    //      scrollbars=no,
    //      status=no,
    //      location=no,
    //      toolbar=no,
    //      menubar=no`
    // );

    // // Write video player HTML to new window
    // videoWindow.document.write(`
    //     <!DOCTYPE html>
    //     <html>
    //     <head>
    //         <title>Welcome to Country</title>
    //         <style>
    //             body {
    //                 margin: 0;
    //                 padding: 0;
    //                 background: #000;
    //                 display: flex;
    //                 justify-content: center;
    //                 align-items: center;
    //                 height: 100vh;
    //                 overflow: hidden;
    //             }
    //             video {
    //                 width: 100%;
    //                 height: 100%;
    //                 object-fit: contain;
    //             }
    //         </style>
    //     </head>
    //     <body>
    //         <video autoplay controls>
    //             <source src="logos/WelcomeToCountry.mp4" type="video/mp4">
    //             Your browser does not support the video tag.
    //         </video>
    //     </body>
    //     </html>
    // `);
    // videoWindow.document.close();

    // // Focus back on welcome button when video window closes
    // if (videoWindow) {
    //     videoWindow.onbeforeunload = () => {
    //         document.querySelector('.hospital-info-card[data-type="welcome"]').focus();
    //     };
    // }
}

function handleVisitingClick() {
    console.log('Opening Visiting Hours...');
    previous_page = current_page;
    current_page = "visiting_hours";
    openInternetWithPdf('Activate');
}

// function handleSafetyClick() {
//     console.log('Opening Stay Safe...');
//     clearHospitalInfoActive();
//     const card = document.querySelector('.hospital-info-card[data-type="safety"]');
//     if (card) {
//         card.classList.add('active');
//     }
// }

// function handleMapsClick() {
//     console.log('Opening Campus Map...');
//     clearHospitalInfoActive();
//     const card = document.querySelector('.hospital-info-card[data-type="maps"]');
//     if (card) {
//         card.classList.add('active');
//     }
// }

function handleRightsClick() {
    // console.log('Opening Healthcare Rights...');
    // clearHospitalInfoActive();
    // const card = document.querySelector('.hospital-info-card[data-type="rights"]');
    // if (card) {
    //     card.classList.add('active');
    // }
    document.getElementById(current_page).style.display = 'none';
    previous_page = current_page;
    current_page = "pdf-viewer-3";
    document.getElementById('pdf-viewer-3').style.display = 'flex';
}

function handleReachClick() {
    document.getElementById(current_page).style.display = 'none';
    previous_page = current_page;
    current_page = "pdf-viewer-2";
    document.getElementById('pdf-viewer-2').style.display = 'flex';
}

function clearHospitalInfoActive() {
    document.querySelectorAll('.hospital-info-card').forEach(card => {
        card.classList.remove('active');
    });
}


// Handle hospital info button click
function handleHospitalInfoClick() {
    console.log('Opening Hospital Info...');

    
    //setting previous and current page
    previous_page = current_page;
    current_page = "hospitalinfo_menu";

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'block';

    document.getElementById("welcome-button").focus();
}
