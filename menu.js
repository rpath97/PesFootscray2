// Track active section
var currentSection = 'default';
const directoryPath = 'logos/channel_logos/';


// radio button action function
function radio_ui(event) {
    const gif = document.querySelector("#gif");
    const rightColumn = document.getElementById("radio_title");
    const rightColumnLogo = document.getElementById("radio-logo-right");
    const gifTitle = document.getElementById("gif-title");

    // leftColumn.style.width = '70vw'; // Change the left column to 2/3 of the container
    rightColumn.innerText = 'Now Playing'; // Make the right column visible (1/3 of the container)
    gifTitle.style.display = 'flex';
    gif.style.display = 'flex';
    rightColumnLogo.style.display = 'flex';
    // rightColumn.style.display = 'flex';

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

    checkImageExists(img_url, function (exists) {
        if (exists) {
            console.log('Image exists.');
        } else {
            rightColumnLogo.src = 'logos/entertainment/radio.png';
            console.log('Image does not exist.');
        }
    });

    document.getElementById(clickedButton.id).focus();
}
// radio button action function
function radio_ui2(channelTitle) {
    var radioChannel = (window.radioChannelsAflexdata || []).find(
        ch => ch.title && ch.title.trim().toLowerCase() === channelTitle.trim().toLowerCase()
    );
    if (!radioChannel) {
        console.error('Radio channel not found:', channelTitle);
        return;
    }
    var streamUrl = radioChannel.moduleAction && radioChannel.moduleAction.url;
    if (!streamUrl) {
        console.error('No stream URL for channel:', channelTitle);
        return;
    }
    // Send JAPIT command to TV to play the RTP stream
    playRadioOnTV(streamUrl, channelTitle);
    // Show the GIF and update UI as before
    showRadioPlayingGif(channelTitle, radioChannel);
}

// Send JAPIT command to TV to play the RTP stream
function playRadioOnTV(streamUrl, channelTitle) {
    // Example JAPIT command for radio (adapt as needed for your TV)
    // This assumes you have a sendWIxPCommand function available
    if (typeof sendWIxPCommand === 'function') {
        var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
        JAPITObjForWIXPSvc.Cookie = 16;
        JAPITObjForWIXPSvc.CmdType = "Change";
        JAPITObjForWIXPSvc.Fun = "ChannelList";
        JAPITObjForWIXPSvc.CommandDetails = {
            "AddChannels": [
                {
                    "BasicChannelDetails": {
                        "ChannelNo": 1,
                        "ChannelName": channelTitle,
                        "ChannelType": "IP"
                    },
                    "ChannelTuningDetails": {
                        "URL": "multicast://" + streamUrl.replace('rtp://', '') + "/0/0/0"
                    }
                }
            ]
        };
        sendWIxPCommand(JAPITObjForWIXPSvc);
    } else {
        console.warn('sendWIxPCommand not available, cannot play radio on TV.');
    }
}

// Show the GIF and update UI for playing radio
function showRadioPlayingGif(channelTitle, radioChannel) {
    const gif = document.querySelector("#gif");
    const rightColumn = document.getElementById("radio_title");
    const rightColumnLogo = document.getElementById("radio-logo-right");
    const gifTitle = document.getElementById("gif-title");

    rightColumn.innerText = 'Now Playing';
    gifTitle.style.display = 'flex';
    gif.style.display = 'flex';
    rightColumnLogo.style.display = 'flex';
    gifTitle.innerHTML = `<div>${channelTitle}</div>`;
    // Optionally update the logo as well
    if (radioChannel && radioChannel.icon && radioChannel.icon.imageUrl) {
        rightColumnLogo.src = radioChannel.icon.imageUrl;
    }
}

// MENU FOCUS ACTION FUNCTION
function focusImageChange() {
    const buttons = document.querySelectorAll(".sub-menu-buttons");

    for (var i = 0 ; i < buttons.length; i++) {
        var button = buttons[i];
        const imageElement = button.querySelector("img");
        const defaultSrc = button.getAttribute("data-default-src"); // Get the default image from the data attribute
        const focusedSrc = button.getAttribute("data-focused-src"); // Get the focused image from the data attribute

        // Change image source when the button is focused
        button.addEventListener("focus", function () {
            imageElement.src = focusedSrc; // Change the image on focus
        });

        // Reset image source when the button loses focus
        button.addEventListener("blur", function () {
            imageElement.src = defaultSrc; // Restore the original image on blur
        });
    }
}


//TEMPORARY BUTTON
// function backTemp() {
//     if (current_page == 'clinical_casting') {
//         setRcControlSelective();
//         current_page = "clinicalservices_menu";
//         previous_page = "default_view";
//         changeCDBstate('Activate');
//         return;
//     } else if (current_page == 'tv_view') {
//         current_page = "entertainment_menu";
//         previous_page = "default_view";
//         console.log("Coming back from tv ", current_page)
//         // switchToHDMI1();
//         // changeCDBstate('Activate');
//         return;
//     } else if (current_page == 'radio_view') {
//         channelStopPlaying(radio_channel_playing);
//         document.querySelector('.sidebar').style.display = 'block';
//
//         // ADJUSTING DISPLAY ELEMENTS
//         const gif = document.querySelector("#gif");
//         const rightColumn = document.getElementById("radio_title");
//         const gifTitle = document.getElementById("gif-title");
//         const rightColumnLogo = document.getElementById("radio-logo-right");
//         rightColumn.innerText = 'Select radio station to play';
//         gif.style.display = 'none';
//         gifTitle.style.display = 'none';
//         rightColumnLogo.style.display = 'none';
//
//     }
//         const videoSrcFrame = document.getElementById('video-src-iframe');
//         const videoElement = document.getElementById('video-frame');
//         if (videoElement) {
//             videoElement.src = '';  //d the welcome video and activated the dashbo
//             videoElement.currentTime = 0;
//             videoElement.pause();
//             console.log("Video stopped");
//             // videoElement.removeEventListener("ended", backTemp());
//         }
//
//     } else if (current_page.toLocaleLowerCase().includes('pdf')) {
//         // current_page = "pdf-viewer-3";
//         // previous_page = "hospitalinfo_menu";
//         //openInternetWithPdf('Deactivate');
//         //document.getElementById('pdf-viewer-3').style.display = 'none';
//         const sidebar = document.querySelector('.sidebar');
//         if (sidebar) {
//             sidebar.style.display = 'block';
//         }
//     }
//     document.getElementById(current_page).style.display = 'none';
//     document.getElementById(previous_page).style.display = 'flex';
//     current_page = previous_page;
//     previous_page = "default_view";
// }

// temporary enter button
function tempEnter() {
    if (current_page == 'video-frame') {
        const videoElement = document.getElementById('video-frame');
        if (videoPlaying) {
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

//OPENING SUB MENU
function handleSubmenuClick(openedView) {

    //setting previous and current page
    previous_page = current_page;
    current_page = openedView;

    document.getElementById(previous_page).style.display = 'none';
    document.getElementById(current_page).style.display = 'flex';

    //document.getElementById("tv_button").focus();

}




