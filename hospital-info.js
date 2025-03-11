// Hospital Information card click handlers
function handleWelcomeClick() {
    console.log('Opening Welcome Video in new window...');
    
    // Calculate center position for the new window
    const width = 1280;  // Video window width
    const height = 720;  // Video window height
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    // Open video file directly in new window
    const videoWindow = window.open('', 'Welcome to Country', 
        `width=${width},
         height=${height},
         left=${left},
         top=${top},
         resizable=yes,
         scrollbars=no,
         status=no,
         location=no,
         toolbar=no,
         menubar=no`
    );

    // Write video player HTML to new window
    videoWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to Country</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background: #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    overflow: hidden;
                }
                video {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            </style>
        </head>
        <body>
            <video autoplay controls>
                <source src="logos/WelcomeToCountry.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </body>
        </html>
    `);
    videoWindow.document.close();

    // Focus back on welcome button when video window closes
    if (videoWindow) {
        videoWindow.onbeforeunload = () => {
            document.querySelector('.hospital-info-card[data-type="welcome"]').focus();
        };
    }
}

function handleVisitingClick() {
    console.log('Opening Visiting Hours...');
    clearHospitalInfoActive();
    const card = document.querySelector('.hospital-info-card[data-type="visiting"]');
    if (card) {
        card.classList.add('active');
    }
}

function handleSafetyClick() {
    console.log('Opening Stay Safe...');
    clearHospitalInfoActive();
    const card = document.querySelector('.hospital-info-card[data-type="safety"]');
    if (card) {
        card.classList.add('active');
    }
}

function handleMapsClick() {
    console.log('Opening Campus Map...');
    clearHospitalInfoActive();
    const card = document.querySelector('.hospital-info-card[data-type="maps"]');
    if (card) {
        card.classList.add('active');
    }
}

function handleRightsClick() {
    console.log('Opening Healthcare Rights...');
    clearHospitalInfoActive();
    const card = document.querySelector('.hospital-info-card[data-type="rights"]');
    if (card) {
        card.classList.add('active');
    }
}

function handleReachClick() {
    console.log('Opening Reach...');
    clearHospitalInfoActive();
    const card = document.querySelector('.hospital-info-card[data-type="reach"]');
    if (card) {
        card.classList.add('active');
    }
}

function clearHospitalInfoActive() {
    document.querySelectorAll('.hospital-info-card').forEach(card => {
        card.classList.remove('active');
    });
}

// Update the JAPIT focus handling
// function handleHospitalInfoFocus() {
//     var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
//     JAPITObjForWIXPSvc.Cookie = 2040;
//     JAPITObjForWIXPSvc.CmdType = "Change";
//     JAPITObjForWIXPSvc.Fun = "UserInputControl";
//     JAPITObjForWIXPSvc.CommandDetails = {
//         "FocusSettings": {
//             "FocusMode": "Explicit",
//             "ElementsToFocus": [
//                 { "ElementId": "welcome", "NextUp": "hospitalInfoButton", "NextDown": "maps", "NextLeft": "safety", "NextRight": "visiting" },
//                 { "ElementId": "visiting", "NextUp": "hospitalInfoButton", "NextDown": "rights", "NextLeft": "welcome", "NextRight": "safety" },
//                 { "ElementId": "safety", "NextUp": "hospitalInfoButton", "NextDown": "reach", "NextLeft": "visiting", "NextRight": "welcome" },
//                 { "ElementId": "maps", "NextUp": "welcome", "NextDown": "hospitalInfoButton", "NextLeft": "reach", "NextRight": "rights" },
//                 { "ElementId": "rights", "NextUp": "visiting", "NextDown": "hospitalInfoButton", "NextLeft": "maps", "NextRight": "reach" },
//                 { "ElementId": "reach", "NextUp": "safety", "NextDown": "hospitalInfoButton", "NextLeft": "rights", "NextRight": "maps" }
//             ]
//         }
//     };
//     sendWIxPCommand(JAPITObjForWIXPSvc);
//     delete JAPITObjForWIXPSvc;
// }

// Add keyboard navigation handling
function handleHospitalInfoKeys(keyCode) {
    const currentFocus = document.activeElement;
    
    if (currentFocus.id === 'welcome-button' || 
        currentFocus.getAttribute('data-type') === 'healthcare-rights') {
        switch(keyCode) {
            case 37: // Left arrow
                const hospitalInfoButton = document.querySelector('.menu-item[data-type="hospitalinfo"]');
                if (hospitalInfoButton) {
                    hospitalInfoButton.focus();
                    return 0; // Key handled
                }
                break;
        }
    }
    return 1; // Key not handled
}

// Add this to your existing event listeners
document.addEventListener('keydown', function(e) {
    if (document.querySelector('.hospital-info-view').style.display === 'block') {
        handleHospitalInfoKeys(e.keyCode);
    }
});

function handleHospitalInfoButtonClick() {
    console.log('Opening Hospital Info section...');
    
    // Hide all views first
    document.querySelectorAll('.content').forEach(view => {
        view.style.display = 'none';
    });
    // document.querySelector('.default-view').style.display = 'none';
    // // Show My Care view
    // const hospitalInfoView = document.querySelector('.hospital-info-view');
    // if (hospitalInfoView) {
    //     hospitalInfoView.style.display = 'block';
    // }  

}
