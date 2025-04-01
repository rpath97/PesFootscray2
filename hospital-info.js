// Hospital Information card click handlers
const videHlsSrcTest = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
const videoLocalFileSrc = 'logos/WelcomeToCountry.mp4';
const pdfLocalFileSample = 'resources/samplePDFmultipage.pdf';
function handleWelcomeClick() {
    console.log('Opening Welcome Video in new window...');

    //setting virtual keys
    // setVideoKeys();

    // //OPENING VIDEO FRAME
    // //setting previous and current page
    // previous_page = current_page;
    // current_page = "video-frame";

    // document.getElementById(previous_page).style.display = 'none';
    // document.getElementById(current_page).style.display = 'block';

    // const videoSrcFrame = document.getElementById('video-src-iframe');
    // const videoElement = document.getElementById(current_page);
    // if (videoSrcFrame) {
    //     //videoSrcFrame.style.display = 'flex';
    //     // var hls = new Hls();
    //     // hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
    //     // hls.attachMedia(videoElement);
    //     // hls.on(Hls.Events.MANIFEST_PARSED, function () {
    //     //     video.play();
    //     // });
    //     videoSrcFrame.src = videoLocalFileSrc;  //d the welcome video and activated the dashbo
    //     videoElement.load(); // Reload the video element
    //     videoElement.play();
    //     //videoElement.addEventListener("ended", backTemp());
    // }
    
    // // Calculate center position for the new window
    // const width = 1280;  // Video window width
    // const height = 720;  // Video window height
    // const left = (window.screen.width - width) / 2;
    // const top = (window.screen.height - height) / 2;
    videoPlayerMp4(videoLocalFileSrc);

    
}

function handleVisitingClick() {
    console.log('Opening Visiting Hours...');
    //setPDFViewKeys(); 

    document.getElementById(current_page).style.display = 'none';
    previous_page = current_page;
    current_page = "pdf-viewers";

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }

    document.getElementById("pdf-viewers").style.display = 'flex';
    
    
    var images = document.querySelectorAll('.pdfImageContainer');
    for (var i = 0; i < images.length; i++) {
        images[i].style.display = 'block';
    }

    document.getElementById("pdf-viewers").focus();
}

function handleReachClick() {
    document.getElementById(current_page).style.display = 'none';
    previous_page = current_page;
    current_page = "pdf-viewers";
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.display = 'none';
    }
    //const pdf_canvas = document.getElementById('pdf-canvas');
    //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    //renderPDF3('https://api.printnode.com/static/test/pdf/multipage.pdf', current_page);
    //pdf_canvas.style.display = 'flex';
    document.getElementById("pdf-viewers").style.display = 'flex';
    //pdfViewer('https://api.printnode.com/static/test/pdf/multipage.pdf');
    PDFJS.workerSrc = "pdf.worker.js";
    PDFJS.getDocument('https://pdfobject.com/pdf/sample.pdf').then(function(pdf) {
        var numPages = pdf.numPages;  // Get the total number of pages
        for (var pageNum = 1; pageNum <= numPages; pageNum++) {
            renderPage(pdf, pageNum);
        }
    }).catch(function(error) {
        console.error("Error loading PDF:", error);
    });
    //openPdf('https://pdfobject.com/pdf/sample.pdf');
    document.getElementById('pdf-viewers').focus();
}



function handleRightsClick() {
    // console.log('Opening Healthcare Rights...');
    // clearHospitalInfoActive();
    // const card = document.querySelector('.hospital-info-card[data-type="rights"]');
    // if (card) {
    //     card.classList.add('active');
    // }
    document.getElementById(current_page).style.display = 'none';
    previous_page = current_page;
    current_page = "pdf-viewers";
    // document.getElementById('pdf-viewer-3').style.display = 'flex';
    // document.getElementById("pdfViewer").data = 'https://pdfobject.com/pdf/sample.pdf';
    // document.getElementById("pdfViewer").style.display = 'flex';
    // document.getElementById("pdf-viewers").style.display = 'flex';
    //const pdf_canvas = document.getElementById('pdf-canvas');
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    renderPDF3(pdfLocalFileSample, current_page);
    //pdf_canvas.style.display = 'flex';
    document.getElementById("pdf-viewers").style.display = 'flex';
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
    document.getElementById(current_page).style.display = 'flex';

    //document.getElementById("welcome-button").focus();
}



//handle keyup when in video
function handleKeyUp() {
    clearInterval(keyPressTimer); // Stop long press detection
    keyPressTimer = null;
    console.log("Long press detached")
}
