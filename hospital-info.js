// Hospital Information button click handler
// function handleHospitalInfoClick() {
//     console.log('Opening Hospital Info...');
    
//     // Hide all views first
//     document.querySelectorAll('.content').forEach(view => {
//         if (view) {
//             view.style.display = 'none';
//         }
//     });
    
//     // Show hospital info view
//     const hospitalInfoView = document.querySelector('.hospital-info-view');
//     if (hospitalInfoView) {
//         hospitalInfoView.style.display = 'block';
//         console.log('Hospital Info view displayed');
//     }
    
//     // Update button states
//     document.querySelectorAll('.menu-item').forEach(item => {
//         item.classList.remove('active');
//     });
    
//     // Add active class to hospital info button
//     const hospitalInfoButton = document.querySelector('.menu-item[data-type="hospitalinfo"]');
//     if (hospitalInfoButton) {
//         hospitalInfoButton.classList.add('active');
//     }
// }

// Hospital Information card click handlers
function handleWelcomeClick() {
    console.log('Opening Welcome Video in new window...');
    
    // Calculate center position for the new window
    const width = 1280;  // Video window width
    const height = 720;  // Video window height
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    // Open video in new window with specific dimensions and position
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
    videoWindow.onbeforeunload = () => {
        document.querySelector('.hospital-info-card[data-type="welcome"]').focus();
    };
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
function handleHospitalInfoFocus() {
    var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
    JAPITObjForWIXPSvc.Cookie = 2040;
    JAPITObjForWIXPSvc.CmdType = "Change";
    JAPITObjForWIXPSvc.Fun = "UserInputControl";
    JAPITObjForWIXPSvc.CommandDetails = {
        "FocusSettings": {
            "FocusMode": "Explicit",
            "ElementsToFocus": [
                { "ElementId": "welcome", "NextUp": "hospitalInfoButton", "NextDown": "maps", "NextLeft": "safety", "NextRight": "visiting" },
                { "ElementId": "visiting", "NextUp": "hospitalInfoButton", "NextDown": "rights", "NextLeft": "welcome", "NextRight": "safety" },
                { "ElementId": "safety", "NextUp": "hospitalInfoButton", "NextDown": "reach", "NextLeft": "visiting", "NextRight": "welcome" },
                { "ElementId": "maps", "NextUp": "welcome", "NextDown": "hospitalInfoButton", "NextLeft": "reach", "NextRight": "rights" },
                { "ElementId": "rights", "NextUp": "visiting", "NextDown": "hospitalInfoButton", "NextLeft": "maps", "NextRight": "reach" },
                { "ElementId": "reach", "NextUp": "safety", "NextDown": "hospitalInfoButton", "NextLeft": "rights", "NextRight": "maps" }
            ]
        }
    };
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;
}

// Add keyboard navigation handling
function handleHospitalInfoKeys(keyCode) {
    if (document.querySelector('.hospital-info-view').style.display === 'block') {
        const currentFocus = document.activeElement;
        
        // Navigation mapping for each card
        const navigationMap = {
            'welcome': {
                'right': 'visiting',
                'left': 'safety',
                'down': 'maps'
            },
            'visiting': {
                'right': 'safety',
                'left': 'welcome',
                'down': 'rights'
            },
            'safety': {
                'right': 'welcome',
                'left': 'visiting',
                'down': 'reach'
            },
            'maps': {
                'right': 'rights',
                'left': 'reach',
                'up': 'welcome'
            },
            'rights': {
                'right': 'reach',
                'left': 'maps',
                'up': 'visiting'
            },
            'reach': {
                'right': 'maps',
                'left': 'rights',
                'up': 'safety'
            }
        };

        if (currentFocus.classList.contains('hospital-info-card')) {
            const currentType = currentFocus.getAttribute('data-type');
            const directions = navigationMap[currentType];
            
            let nextType;
            switch(keyCode) {
                case 37: // Left
                    nextType = directions['left'];
                    handleHospitalLeftButton();
                    break;
                case 38: // Up
                    nextType = directions['up'];
                    handleHospitalUpButton();
                    break;
                case 39: // Right
                    nextType = directions['right'];
                    handleHospitalRightButton();
                    break;
                case 40: // Down
                    nextType = directions['down'];
                    handleHospitalDownButton();
                    break;
            }

            if (nextType) {
                if (nextType === 'hospitalInfoButton') {
                    const sidebarButton = document.getElementById('hospitalInfoButton');
                    if (sidebarButton) {
                        sidebarButton.focus();
                    }
                } else {
                    const nextCard = document.querySelector(`.hospital-info-card[data-type="${nextType}"]`);
                    if (nextCard) {
                        nextCard.focus();
                    }
                }
            }
        }

        // Send JAPIT command for key press
        var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
        JAPITObjForWIXPSvc.Cookie = 2030;
        JAPITObjForWIXPSvc.CmdType = "Change";
        JAPITObjForWIXPSvc.Fun = "UserInputControl";
        
        switch(keyCode) {
            case 37: // Left
                JAPITObjForWIXPSvc.CommandDetails = {
                    "VirtualKeyDetails": {
                        "VirtualKey": "HBBTV_VK_LEFT"
                    }
                };
                break;
            case 38: // Up
                JAPITObjForWIXPSvc.CommandDetails = {
                    "VirtualKeyDetails": {
                        "VirtualKey": "HBBTV_VK_UP"
                    }
                };
                break;
            case 39: // Right
                JAPITObjForWIXPSvc.CommandDetails = {
                    "VirtualKeyDetails": {
                        "VirtualKey": "HBBTV_VK_RIGHT"
                    }
                };
                break;
            case 40: // Down
                JAPITObjForWIXPSvc.CommandDetails = {
                    "VirtualKeyDetails": {
                        "VirtualKey": "HBBTV_VK_DOWN"
                    }
                };
                break;
        }
        
        sendWIxPCommand(JAPITObjForWIXPSvc);
        delete JAPITObjForWIXPSvc;
        return 0;
    }
    return 1;
}
