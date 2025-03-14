// Functions that contain different JAPIT messages to execute different tasks to the TV


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
// Open Spotify application
function openSpotify() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();	

	JAPITObjForWIXPSvc.Cookie  = 119;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
			"ApplicationAndroidPackageName": "com.spotify.tv.android"
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

//stop playing channels feature
function channelStopPlaying(channNo) {
 
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie  = 8;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ChannelSelection";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ChannelTuningDetails": {
			"ChannelNumber": channNo
		},
		"TrickMode": 'Stop'
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

//OPENING INTERNET VIWTH URLS

function openInternetWithPdf(state) {
 
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie  = 87;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun     = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"ApplicationDetails": {
			"ApplicationName": 'Internet',
			"ApplicationAttributes": {
				"WebsiteURL": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
			}
		},
		"ApplicationState": state,
		
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}
