// Functions that contain different JAPIT messages to execute different tasks to the TV
// Author: Hanson Wilson
// Date: 03/10/2024

// Global variables
var radioOn = 0;
var castState = 0;

// Channel Selection
function channelSelection(chan_no) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 8;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
			"ChannelNumber": chan_no
		}
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
    console.log("Channel selected: " + chan_no);
}

// JAPIT message for rebooting the TV
function reboot() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 9;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "PowerState";
	JAPITObjForWIXPSvc.CommandDetails = {
        "PowerAction": "Reboot"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// JAPIT message to change power state
function powerState(state) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 9;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "PowerState";
	JAPITObjForWIXPSvc.CommandDetails = {
        "ToPowerState": state
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// Selecting the Cast Button calls the function
function SelectCast(state) {
    if (state === 'Activate') {
		castState = 1;
		mute("Off");
	}
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 10;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
            "ApplicationName": "Googlecast"
			},
		"ApplicationState": state
 	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// Application Control: Activate/Deactivate applications
function applicationControl(application, state) {
    castState = state === 'Activate' ? 1 : 0;
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();	

	JAPITObjForWIXPSvc.Cookie  = 11;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
			"ApplicationName": application
			},
		"ApplicationState": state
 	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// Open Aflex application
function openMovies() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();	

	JAPITObjForWIXPSvc.Cookie  = 119;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
			"ApplicationAndroidPackageName": "com.stellar.movies"
			},
		"ApplicationState": 'Activate'
 	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}
// Open Netflix application
function openNetflix() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();	

	JAPITObjForWIXPSvc.Cookie  = 119;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
			"ApplicationAndroidPackageName": "com.netflix.ninja"
			},
		"ApplicationState": 'Activate'
 	};
    
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// Open Kayo application
function openKayo() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();	

	JAPITObjForWIXPSvc.Cookie  = 119;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
			"ApplicationAndroidPackageName": "au.com.kayosports.tv"
			},
		"ApplicationState": 'Activate'
 	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
    //applicationControl("KayoSports", "Activate");
}
function openKayo2() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();	

	JAPITObjForWIXPSvc.Cookie  = 119;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
			"ApplicationName": "Internet"
			},
		"ApplicationAttributes": {
            "WebsiteURL": "https://youtube.com"
        },
        "ApplicationState": 'Activate'
 	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
    //applicationControl("KayoSports", "Activate");
}


// Internet Hotspot Control
function internetHotspot(state) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();	

	JAPITObjForWIXPSvc.Cookie  = 22;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ProfessionalSettingsControl";
	JAPITObjForWIXPSvc.CommandDetails = {
        "InternetHotspot": state
 	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// Request application state from TV
function requestState() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 12;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "Source";
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// Turn TV Channels On
function tvChannelsApp(state) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 13;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
			"ApplicationName": "TVChannels",
            "ApplicationType": "Native",
            "ApplicationSubState": "TVChannelAV"
			},
			"ApplicationState": state
		};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	console.log("TV Channels App opened");
	delete JAPITObjForWIXPSvc;
}

// Mute/Unmute TV Audio
function mute(status) {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 15;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "AudioControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"AudioMute": status
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// Remove all channels
function removeChannels() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 17;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {
		"Remove": ["ALL"]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// Get Professional Settings
function getProfessionalSettings() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie         = 1040;
	JAPITObjForWIXPSvc.CmdType        = "Request";
	JAPITObjForWIXPSvc.Fun            = "ProfessionalSettingsControl";
	JAPITObjForWIXPSvc.CommandDetails = {
        "ProfessionalSettingsParameters": [
		"SerialNumber",
		"IdentificationSettings",
		"NetworkSettings",
            "NetworkStatus"
			]
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

// Request Channel List
function channelList() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	
	JAPITObjForWIXPSvc.Cookie  = 85;
	JAPITObjForWIXPSvc.CmdType = "Request";
	JAPITObjForWIXPSvc.Fun     = "ChannelList";
	JAPITObjForWIXPSvc.CommandDetails = {
        "ContentLevel": "BasicChannelDetails"
    };
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;
}

// Handle Back Button
// function handleBackButton() {
//     if (document.querySelector('.hospital-info-view').style.display === 'block') {
//         document.querySelector('.hospital-info-view').style.display = 'none';
//         document.querySelector('.default-view').style.display = 'block';
//         const menuButton = document.getElementById('hospitalInfoButton');
//         if (menuButton) {
//             menuButton.focus();
//         }

//         var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
//         JAPITObjForWIXPSvc.Cookie = 1020;
//         JAPITObjForWIXPSvc.CmdType = "Change";
//         JAPITObjForWIXPSvc.Fun = "ApplicationControl";
//         JAPITObjForWIXPSvc.CommandDetails = {
//             "ApplicationDetails": {
//                 "ApplicationName": "Dashboard"
//             },
//             "ApplicationState": "Active"
//         };
//         sendWIxPCommand(JAPITObjForWIXPSvc);
//         return 0;
//     } else if (document.querySelector('.entertainment-view').style.display === 'block') {
//         document.querySelector('.entertainment-view').style.display = 'none';
//         document.querySelector('.default-view').style.display = 'block';
//         const menuButton = document.getElementById('entertainmentButton');
//         if (menuButton) {
//             menuButton.focus();
//         }

//         var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
//         JAPITObjForWIXPSvc.Cookie = 1020;
//         JAPITObjForWIXPSvc.CmdType = "Change";
//         JAPITObjForWIXPSvc.Fun = "ApplicationControl";
//         JAPITObjForWIXPSvc.CommandDetails = {
//             "ApplicationDetails": {
//                 "ApplicationName": "Dashboard"
//             },
//             "ApplicationState": "Active"
//         };
//         sendWIxPCommand(JAPITObjForWIXPSvc);
//         return 0;
//     }
//     return 1;
// }

// Handle Entertainment Navigation
function handleEntertainmentKeys(keyCode) {
    if (document.querySelector('.entertainment-view').style.display === 'block') {
        const currentFocus = document.activeElement;
        
        // Navigation mapping for each card
        const navigationMap = {
            'tv': {
                'right': 'movies',
                'left': 'entertainmentButton'  // Goes to sidebar
            },
            'movies': {
                'right': 'radio',
                'left': 'tv',
                'down': 'netflix'
            },
            'radio': {
                'right': 'netflix',  // Wraps to next row
                'left': 'movies',
                'down': 'youtube'
            },
            'netflix': {
                'right': 'youtube',
                'left': 'radio',  // Goes to radio instead of sidebar
                'up': 'movies'
            },
            'youtube': {
                'left': 'netflix',
                'up': 'radio'
            }
        };

        if (currentFocus.classList.contains('entertainment-card')) {
            const currentType = currentFocus.getAttribute('data-type');
            const directions = navigationMap[currentType];
            
            let nextType;
            switch(keyCode) {
                case 37: // Left
                    nextType = directions['left'];
                    handleLeftButton();
                    break;
                case 38: // Up
                    nextType = directions['up'];
                    handleUpButton();
                    break;
                case 39: // Right
                    nextType = directions['right'];
                    handleRightButton();
                    break;
                case 40: // Down
                    nextType = directions['down'];
                    handleDownButton();
                    break;
            }

            if (nextType) {
                if (nextType === 'entertainmentButton') {
                    // Navigate to sidebar
                    const sidebarButton = document.getElementById('entertainmentButton');
                    if (sidebarButton) {
                        sidebarButton.focus();
                    }
                } else {
                    // Navigate to next card
                    const nextCard = document.querySelector(`.entertainment-card[data-type="${nextType}"]`);
                    if (nextCard) {
                        nextCard.focus();
                    }
                }
            }
        }

        // Send JAPIT command for key press
        var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
        JAPITObjForWIXPSvc.Cookie = 1030;
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

// Add this new function to handle JAPIT focus for entertainment section
function handleEntertainmentFocus() {
    // Register entertainment cards for JAPIT focus
    var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
    JAPITObjForWIXPSvc.Cookie = 1040;
    JAPITObjForWIXPSvc.CmdType = "Change";
    JAPITObjForWIXPSvc.Fun = "UserInputControl";
    JAPITObjForWIXPSvc.CommandDetails = {
        "FocusSettings": {
            "FocusMode": "Explicit",
            "ElementsToFocus": [
                { "ElementId": "tv", "NextUp": "entertainmentButton", "NextDown": "netflix", "NextLeft": "youtube", "NextRight": "movies" },
                { "ElementId": "movies", "NextUp": "entertainmentButton", "NextDown": "youtube", "NextLeft": "tv", "NextRight": "radio" },
                { "ElementId": "radio", "NextUp": "entertainmentButton", "NextDown": "youtube", "NextLeft": "movies", "NextRight": "netflix" },
                { "ElementId": "netflix", "NextUp": "tv", "NextDown": "entertainmentButton", "NextLeft": "radio", "NextRight": "youtube" },
                { "ElementId": "youtube", "NextUp": "movies", "NextDown": "entertainmentButton", "NextLeft": "netflix", "NextRight": "tv" }
            ]
        }
    };
    sendWIxPCommand(JAPITObjForWIXPSvc);
    delete JAPITObjForWIXPSvc;
}

// Function that handles hospital info focus when hospital info button is clicked
function handleHospitalInfoFocus() {
    // Register hospital info cards for JAPIT focus
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

// Add hospital info navigation key handling
function handleHospitalInfoKeys(keyCode) {
    if (document.querySelector('.hospital-info-view').style.display === 'block') {
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
                handleHospitalLeftButton();
                break;
                
            case 39: // Right
                JAPITObjForWIXPSvc.CommandDetails = {
                    "VirtualKeyDetails": {
                        "VirtualKey": "HBBTV_VK_RIGHT"
                    }
                };
                handleHospitalRightButton();
                break;
                
            case 38: // Up
                JAPITObjForWIXPSvc.CommandDetails = {
                    "VirtualKeyDetails": {
                        "VirtualKey": "HBBTV_VK_UP"
                    }
                };
                handleHospitalUpButton();
                break;
                
            case 40: // Down
                JAPITObjForWIXPSvc.CommandDetails = {
                    "VirtualKeyDetails": {
                        "VirtualKey": "HBBTV_VK_DOWN"
                    }
                };
                handleHospitalDownButton();
                break;
        }
        
        sendWIxPCommand(JAPITObjForWIXPSvc);
        delete JAPITObjForWIXPSvc;
        return 0;
    }
    return 1;
}

// Add these functions for hospital info navigation
function handleHospitalLeftButton() {
    if (document.querySelector('.hospital-info-view').style.display === 'block') {
        const currentFocus = document.activeElement;
        
        // Navigation mapping for left button
        const leftNavigationMap = {
            'welcome': 'safety',
            'visiting': 'welcome',
            'safety': 'visiting',
            'maps': 'reach',
            'rights': 'maps',
            'reach': 'rights'
        };

        if (currentFocus.classList.contains('hospital-info-card')) {
            const currentType = currentFocus.getAttribute('data-type');
            const nextType = leftNavigationMap[currentType];
            const nextCard = document.querySelector(`.hospital-info-card[data-type="${nextType}"]`);
            if (nextCard) {
                nextCard.focus();
            }
        }
    }
}

function handleHospitalRightButton() {
    if (document.querySelector('.hospital-info-view').style.display === 'block') {
        const currentFocus = document.activeElement;
        
        // Navigation mapping for right button
        const rightNavigationMap = {
            'welcome': 'visiting',
            'visiting': 'safety',
            'safety': 'welcome',
            'maps': 'rights',
            'rights': 'reach',
            'reach': 'maps'
        };

        if (currentFocus.classList.contains('hospital-info-card')) {
            const currentType = currentFocus.getAttribute('data-type');
            const nextType = rightNavigationMap[currentType];
            const nextCard = document.querySelector(`.hospital-info-card[data-type="${nextType}"]`);
            if (nextCard) {
                nextCard.focus();
            }
        }
    }
}

function handleHospitalUpButton() {
    if (document.querySelector('.hospital-info-view').style.display === 'block') {
        const currentFocus = document.activeElement;
        
        // Navigation mapping for up button
        const upNavigationMap = {
            'maps': 'welcome',
            'rights': 'visiting',
            'reach': 'safety'
        };

        if (currentFocus.classList.contains('hospital-info-card')) {
            const currentType = currentFocus.getAttribute('data-type');
            const nextType = upNavigationMap[currentType];
            const nextCard = document.querySelector(`.hospital-info-card[data-type="${nextType}"]`);
            if (nextCard) {
                nextCard.focus();
            }
        }
    }
}

function handleHospitalDownButton() {
    if (document.querySelector('.hospital-info-view').style.display === 'block') {
        const currentFocus = document.activeElement;
        
        // Navigation mapping for down button
        const downNavigationMap = {
            'welcome': 'maps',
            'visiting': 'rights',
            'safety': 'reach'
        };

        if (currentFocus.classList.contains('hospital-info-card')) {
            const currentType = currentFocus.getAttribute('data-type');
            const nextType = downNavigationMap[currentType];
            const nextCard = document.querySelector(`.hospital-info-card[data-type="${nextType}"]`);
            if (nextCard) {
                nextCard.focus();
            }
        }
    }
}
// Add menu navigation mapping
const menuNavigationMap = {
    'entertainmentButton': {
        'up': 'clinicalButton',  // Wrap to bottom
        'down': 'hospitalInfoButton'
    },
    'hospitalInfoButton': {
        'up': 'entertainmentButton',
        'down': 'myCareButton'
    },
    'myCareButton': {
        'up': 'hospitalInfoButton',
        'down': 'clinicalButton'
    },
    'clinicalButton': {
        'up': 'myCareButton',
        'down': 'entertainmentButton'  // Wrap to top
    }
};

// Update handleMenuKeys function
function handleMenuKeys(keyCode) {
    const currentFocus = document.activeElement;
    const currentId = currentFocus.id;
    
    if (menuNavigationMap[currentId]) {
        let nextId;
        switch(keyCode) {
            case 38: // Up
                nextId = menuNavigationMap[currentId]['up'];
                break;
            case 40: // Down
                nextId = menuNavigationMap[currentId]['down'];
                break;
        }

        if (nextId) {
            const nextButton = document.getElementById(nextId);
            if (nextButton) {
                nextButton.focus();
                
                // Send JAPIT focus command
                var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
                JAPITObjForWIXPSvc.Cookie = 1020;
                JAPITObjForWIXPSvc.CmdType = "Change";
                JAPITObjForWIXPSvc.Fun = "UserInputControl";
                JAPITObjForWIXPSvc.CommandDetails = {
                    "FocusSettings": {
                        "SetFocusTo": nextId
                    }
                };
                sendWIxPCommand(JAPITObjForWIXPSvc);
                delete JAPITObjForWIXPSvc;
            }
        }
        return 0;
    }
    return 1;
}

