// Track active section
let currentSection = 'default';
const directoryPath = 'logos/channel_logos/'; 

// Menu click handlers
// function handleMenuClick(section, event) {
//     console.log('Menu click:', section);
    
//     // Remove active class from all menu items
//     document.querySelectorAll('.menu-item').forEach(item => {
//         item.classList.remove('active');
//     });

//     // Add active class to clicked item
//     if (event && event.currentTarget) {
//         event.currentTarget.classList.add('active');
//     }

//     // Hide all content sections
//     document.querySelectorAll('.content').forEach(content => {
//         content.style.display = 'none';
//     });

//     // Show selected section
//     if (section === 'entertainment') {
//         document.querySelector('.entertainment-view').style.display = 'block';
//         currentSection = 'entertainment';
        
//         // Focus first entertainment card
//         setTimeout(() => {
//             const firstCard = document.querySelector('.entertainment-card');
//             if (firstCard) {
//                 firstCard.focus();
//             }
//         }, 100);
//     } else {
//         document.querySelector('.default-view').style.display = 'block';
//         currentSection = 'default';
//     }
// }

// Function to return to home/default view
// function returnToHome() {
//     JAPITReturnToHome();
// }





// Handle entertainment button click specifically


// function back2dashboard() {
//     document.getElementById("radio_list").style.display = "none";
//     document.getElementById("nav").style.display = "flex";
//     document.getElementById("patientMenu").style.display = "block";
//     document.getElementById("gallery").style.display = "flex";

//     document.getElementById('ButtonTVChannel').focus();
// }

function radio_ui(event) {
    const leftColumn = document.querySelector(".radio-view");
    // const rightColumn = document.getElementById("right-column");
    // const rightColumnLogo = document.getElementById("radio-logo-right");
    // const gifTitle = document.getElementById("gif-title");
    
    //leftColumn.style.flex = 2; // Change the left column to 2/3 of the container
    // rightColumn.style.flex = 1; // Make the right column visible (1/3 of the container)
    
    const clickedButton = event.currentTarget;  // Get the clicked element
    const buttonId = clickedButton.id;   // Access the ID property
    const channel_no = channel_list.find(item => item.BasicChannelDetails.ChannelName === buttonId);
    channelSelection(channel_no.BasicChannelDetails.ChannelNo);
    radio_channel_playing = channel_no.BasicChannelDetails.ChannelNo; //it plays as defined in the channel_list
    // gifTitle.innerHTML = `<div>${buttonId}</div>`;
    // channelSelection(buttonId);
    const logoname = buttonId + '.png';
    const img_src = directoryPath + logoname;
    // rightColumnLogo.src = img_src.toLocaleLowerCase();
    // img_url = rightColumnLogo.src;
    
    // checkImageExists(img_url, function(exists) {
    //     if (exists) {
    //         console.log('Image exists.');
    //     } else {
    //         //rightColumnLogo.src = 'UI_images/radioicon2.png';
    //         console.log('Image does not exist.');
    //     }
    // });

    document.getElementById(clickedButton.id).focus(); 
}

function remove_channel() {
    document.querySelector('.radio-button-container').remove();
}

function add_channel() {
    const leftColumn = document.getElementById("left-column");
    const rightColumn = document.getElementById("right-column");
    const gifTitle = document.getElementById("gif-title");
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('radio-button-container');
    
    const btnElement = document.createElement('button');
    btnElement.id = channel_list[1].BasicChannelDetails.ChannelName;
    btnElement.class = 'radio_chan_btn';

    // Create image element
    var image = document.createElement("img");
    image.src = "UI_images/radioicon2.png";
    image.style.width = "100px";
    btnElement.appendChild(image);

    // Create text element
    var textSpan = document.createElement("span");
    textSpan.className = "buttonText";
    textSpan.textContent = channel_list[1].BasicChannelDetails.ChannelName;
    btnElement.appendChild(textSpan);

    btnElement.style.fontSize = "30px"; 
    btnElement.style.margin = "30px";
    btnElement.style.width = "200px";
    btnElement.style.height = "180px";
    btnElement.addEventListener('click', radio_ui);

    const channlName = channel_list[1].BasicChannelDetails.ChannelName;

    const titleElement = document.createElement('div');
    titleElement.textContent = channel_list[1].BasicChannelDetails.ChannelName;

    buttonContainer.appendChild(btnElement);
    leftColumn.appendChild(buttonContainer);
}

//TEMPORARY BUTTON
function backTemp() {
    if (current_page == 'clinical_casting'){
        setRcControlSelective();
        current_page = "clinicalservices_menu";
        previous_page = "default_view";
        changeCDBstate('Activate');
    } else if (current_page == 'tv_view') {
        current_page = "entertainment_menu";
        previous_page = "default_view";
        switchToHDMI1();
        changeCDBstate('Activate');
    } else if (current_page == 'radio_view') {
        channelStopPlaying(radio_channel_playing);
    //     document.getElementById(current_page).style.display = 'none';
    //     document.getElementById(previous_page).style.display = 'flex';
    //     current_page = previous_page;
    //     previous_page = "default_view";
    //     return;
    } else if (current_page == 'video-frame') {
        const videoSrcFrame = document.getElementById('video-src-iframe');
        const videoElement = document.getElementById('video-frame');
        if (videoSrcFrame) {
            videoSrcFrame.src = '';  //d the welcome video and activated the dashbo
            videoElement.pause()
            videoElement.currentTime = 0;
        }
    }
    document.getElementById(current_page).style.display = 'none';
    document.getElementById(previous_page).style.display = 'block';
    current_page = previous_page;
    previous_page = "default_view";
}