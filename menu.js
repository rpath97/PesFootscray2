// Track active section
let currentSection = 'default';
const directoryPath = 'logos/channel_logos/'; 


// radio button action function
function radio_ui(event) {
    const leftColumn = document.querySelector("#radio-left-column");
    const rightColumn = document.getElementById("radio-right-column");
    const rightColumnLogo = document.getElementById("radio-logo-right");
    const gifTitle = document.getElementById("gif-title");
    
    leftColumn.style.width = '70vw'; // Change the left column to 2/3 of the container
    rightColumn.style.width = '30vw'; // Make the right column visible (1/3 of the container)
    rightColumn.style.display = 'flex';
    
    const clickedButton = event.currentTarget;  // Get the clicked element
    const buttonId = clickedButton.id;   // Access the ID property
    const channel_no = channel_list.find(item => item.BasicChannelDetails.ChannelName === buttonId);
    channelSelection(channel_no.BasicChannelDetails.ChannelNo);
    radio_channel_playing = channel_no.BasicChannelDetails.ChannelNo; //it plays as defined in the channel_list
    gifTitle.innerHTML = `<div>${buttonId}</div>`;
    // channelSelection(buttonId);
    const logoname = buttonId + '.png';
    const img_src = directoryPath + logoname;
    rightColumnLogo.src = img_src.toLocaleLowerCase();
    const img_url = rightColumnLogo.src;
    
    checkImageExists(img_url, function(exists) {
        if (exists) {
            console.log('Image exists.');
        } else {
            rightColumnLogo.src = 'logos/entertainment/radio.png';
            console.log('Image does not exist.');
        }
    });

    document.getElementById(clickedButton.id).focus(); 
}

// MENU FOCUS ACTION FUNCTION
function focusImageChange() {
    const buttons = document.querySelectorAll(".sub-menu-buttons");

    buttons.forEach(button => {
        const imageElement = button.querySelector("img");
        const defaultSrc = button.getAttribute("data-default-src"); // Get the default image from the data attribute
        const focusedSrc = button.getAttribute("data-focused-src"); // Get the focused image from the data attribute

        // Change image source when the button is focused
        button.addEventListener("focus", function() {
            imageElement.src = focusedSrc; // Change the image on focus
        });

        // Reset image source when the button loses focus
        button.addEventListener("blur", function() {
            imageElement.src = defaultSrc; // Restore the original image on blur
        });
    });
}


//TEMPORARY BUTTON
function backTemp() {
    if (current_page == 'clinical_casting'){
        setRcControlSelective();
        current_page = "clinicalservices_menu";
        previous_page = "default_view";
        changeCDBstate('Activate');
        return;
    } else if (current_page == 'tv_view') {
        current_page = "entertainment_menu";
        previous_page = "default_view";
        console.log("Coming back from tv ", current_page)
        // switchToHDMI1();
        // changeCDBstate('Activate');
        return;
    } else if (current_page == 'radio_view') {
        channelStopPlaying(radio_channel_playing);
        document.querySelector('.sidebar').style.display = 'block';
        
        // readjusting radio view
        const leftColumn = document.querySelector("#radio-left-column");
        const rightColumn = document.getElementById("radio-right-column");
        
        leftColumn.style.width = '100vw';
        rightColumn.style.width = '0vw'; 
        rightColumn.style.display = 'none';

    } else if (current_page == 'video-frame') {
        const videoSrcFrame = document.getElementById('video-src-iframe');
        const videoElement = document.getElementById('video-frame');
        if (videoElement) {
            videoElement.src = '';  //d the welcome video and activated the dashbo
            videoElement.currentTime = 0;
            videoElement.pause();
            console.log("Video stopped");
            // videoElement.removeEventListener("ended", backTemp());
        }

    } else if (current_page.toLocaleLowerCase().includes('pdf')) {
        // current_page = "pdf-viewer-3";
        // previous_page = "hospitalinfo_menu";
        //openInternetWithPdf('Deactivate');
        //document.getElementById('pdf-viewer-3').style.display = 'none';
    }
    document.getElementById(current_page).style.display = 'none';
    document.getElementById(previous_page).style.display = 'flex';
    current_page = previous_page;
    previous_page = "default_view";
}
// temporary enter button
function tempEnter() {
    if (current_page == 'video-frame'){
        const videoElement = document.getElementById('video-frame');
        if (videoPlaying){
            videoElement.pause();
            videoPlaying = !videoPlaying;
        } else if (!videoPlaying) {
            videoElement.play();
            videoPlaying = !videoPlaying;
        }
    }
}
// temporary right button
function tempRightButton() {
    if (current_page == 'video-frame') {
        const videoElement = document.getElementById('video-frame');
        videoElement.currentTime = Math.min(videoElement.currentTime + 1, videoElement.duration);
    }
}
// temporary left button
function tempLeftButton() {
    if (current_page == 'video-frame') {
        const videoElement = document.getElementById('video-frame');
        videoElement.currentTime = Math.max(videoElement.currentTime - 1, 0);
    }
}