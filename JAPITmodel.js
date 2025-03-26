/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/
/* global variables */
var current_page = "default_view";
var previous_page = "";
var dashboard_on = true;
var videoPlaying = false;
var tv_info = {
	roomid: 1,
	tv_ip: "",
	tv_serial: "",
	last_update: ""
};


function Exercise01ModelInit() {
	setRcControlSelective();
	RegisterCallbacks();
}

/* assigning the callback function from the TV to another function*/
function RegisterCallbacks() {
	JAPITWIXPPlugin.WebIXPOnReceive = WIXPResponseHandler;
}

/* this function will call the required function depending on the response received from the TV */
function WIXPResponseHandler(WIXPResponseJSON) {
	try {
		parsedWIXPJSON = JSON.parse(WIXPResponseJSON);
		PrintLogsWIXPFromTV(parsedWIXPJSON);

		//PROFESSIONAL SETTINGS RESPONSE
		if(parsedWIXPJSON.Fun == "ProfessionalSettingsControl") {
			const roomid = parsedWIXPJSON.CommandDetails.IdentificationSettings.RoomID;
			const tv_ip_new = parsedWIXPJSON.CommandDetails.NetworkStatus.IPAddress;
			const serial_no = parsedWIXPJSON.CommandDetails.SerialNumber;
			const deviceName = parsedWIXPJSON.CommandDetails.IdentificationSettings.DeviceName.CustomName;
			const today = new Date();
			tv_info.roomid = roomid;
			tv_info.tv_ip = tv_ip_new;
			tv_info.tv_serial = serial_no;
			tv_info.last_update = today.toLocaleTimeString();
			
		}

		// CHANNELS RESPONSE
		if (parsedWIXPJSON.Fun == "ChannelSelection"){ //When TV responds with an error
			if (tv_channel_on == 1 && dashboard_on && current_page == 'tv_view') {                        
				if (parsedWIXPJSON.CommandDetails.ChannelTuningDetails.ChannelNumber){             
					if (parsedWIXPJSON.CommandDetails.ChannelSelectionStatus == 'Failure'){
						setTimeout(loadChannel, 500);
						
						//channelSelection(default_chan_no);
					} else if (parsedWIXPJSON.CommandDetails.ChannelSelectionStatus == 'Started'){
						const tv_buffer = document.getElementById("loadingGif");
						setTimeout(()=>tv_buffer.style.display = 'none', 2000);
						//document.getElementById("loadingGif").style.display = 'none';
						tvChannelsApp('Activate');
					}	
				}
			
			} else if (tv_channel_on == 1 && current_page == 'tv_view') {
				current_tv_channel = parsedWIXPJSON.CommandDetails.ChannelTuningDetails.ChannelNumber;
				document.getElementById("logmsgcallback").value += '\n' + 'Dasohboard value  ' + dashboard_on  + '\n';
				document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
			}		
		} 


	} catch (e) {
		//Error - can print to logs view
		document.getElementById("logmsgcallback").value += '\n' + "JAPITmode.js line 53" +e + '\n';
		document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;
		errorCount++;
		//This is turn the tv screen off and reset the errorCount. Mainly to over the Googlecast error.
		if (errorCount > 10) {
			errorCount = 0;
			//powerState('Standby');
		}
		return e;
	}
}

/* function to send commands to TV */
function sendWIxPCommand(command) {
	try {
		var WIXPJSONStringForm = JSON.stringify(command);
		PrintLogsWIXPToTV(command);
		JAPITWIXPPlugin.WebIxpSend(WIXPJSONStringForm);
	}
	catch (e) {
		console.error("Error in sendWIxPCommand:", e);
	}
}

/* create some attributes of the WIXP object */
function CreateJAPITObjectForWIXPSvc() {
	this.Svc = "WIXP";
	this.SvcVer = "4.0";
	this.Cookie = 222;
}

function switchToMainTuner() {
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1055;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "Source";
	JAPITObjForWIXPSvc.CommandDetails = {
		"TuneToSource": "MainTuner"
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}
//FUNCTION TO OPEN TV CHANNEL AFTER DELAY
function loadChannel() {
	// document.getElementById("nav").style.display = "none";
	// document.getElementById("patientMenu").style.display = "none";
	// document.getElementById("gallery").style.display = "none";
	// document.getElementById("topbar").style.display = "none";
	// document.body.style.backgroundColor = '#000000';
	//document.getElementById("loadingGif").style.display = 'flex';
	channelSelection(current_tv_channel);
}

function switchToHDMI1() {  //clinical services to HDMI STR
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1055;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "Source";
	JAPITObjForWIXPSvc.CommandDetails = {
		"TuneToSource": "HDMI1"
	};
	changeCDBstate('Deactivate');  //deactivate the dashboard to open HDMI STR
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function activateTeletext() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1021;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
	{
		"ApplicationDetails":
		{
			"ApplicationName": "Teletext",
			"ApplicationAttributes":
			{
				"TeletextPage": 120,
				"TeletextSubcode": 34
			}

		},
		"ApplicationState": "Activate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function deactivateTeletext() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1022;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
	{
		"ApplicationDetails":
		{
			"ApplicationName": "Teletext",
		},
		"ApplicationState": "Deactivate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function setRcControlAll() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1011;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "AllVirtualKeyForward"
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}
//SET VIRTUAL KEYS TO NONE
function setRcControlNone() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1011;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "DontForwardAnyVirtualKey"
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function setRcControlExTxt() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1013;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "ForwardAllExceptVirtualKeysRequiredForTeletext"
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

// Setting virtual keys
function setRcControlSelective() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 6;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded":
			[
				// { "vkkey" : "HBBTV_VK_POWER" }, // not existing 
				// { "vkkey" : "HBBTV_VK_MYCHOICE" },
				{ "vkkey": "HBBTV_VK_CLOCK" },
				// { "vkkey" : "HBBTV_VK_SMARTTV" },
				//{ "vkkey" : "HBBTV_VK_CHANNELGRID" },
				{ "vkkey": "HBBTV_VK_ALARM" },
				{ "vkkey": "HBBTV_VK_SMARTINFO" },
				// { "vkkey" : "HBBTV_VK_SOURCE" },
				{ "vkkey": "HBBTV_VK_TV" },
				// { "vkkey" : "HBBTV_VK_FORMAT" },
				//{ "vkkey" : "HBBTV_VK_HOME" }, // not existing
				// { "vkkey" : "HBBTV_VK_PLAY_PAUSE" }, // previously was VK_OSRC
				{ "vkkey": "HBBTV_VK_GUIDE" },
				// { "vkkey" : "HBBTV_VK_UP" }, // not existing
				// { "vkkey" : "HBBTV_VK_INFO" },
				//{ "vkkey" : "HBBTV_VK_LEFT" }, // not existing
				// { "vkkey" : "HBBTV_VK_ACCEPT" }, // not existing
				// { "vkkey" : "HBBTV_VK_RIGHT" }, // not existing
				{ "vkkey": "HBBTV_VK_ADJUST" }, //SETTINGS BUTTON
				// { "vkkey" : "HBBTV_VK_DOWN" }, // not existing
				{ "vkkey": "HBBTV_VK_MENU" }, // Home Button
				{ "vkkey": "HBBTV_VK_BACK" }, // not existing
				{ "vkkey": "HBBTV_VK_RED" },
				{ "vkkey": "HBBTV_VK_GREEN" },
				{ "vkkey": "HBBTV_VK_YOUTUBE" },
				{ "vkkey": "HBBTV_VK_WEATHER" },
				//{"vkkey": "	HBBTV_VK_SETTINGS"}, //doesn't affect settings button
				{ "vkkey": "HBBTV_VK_OPTIONS" },
				{ "vkkey": "HBBTV_VK_1" },
				{ "vkkey": "HBBTV_VK_2" },
				{ "vkkey": "HBBTV_VK_3" },
				{ "vkkey": "HBBTV_VK_4" }
			]
	}

	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}
// MAKING ARROW BUTTONS TO VIRTUAL KEYS
function setArrowButtonsVirtual() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 6;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded":
			[
				// { "vkkey" : "HBBTV_VK_POWER" }, // not existing 
				// { "vkkey" : "HBBTV_VK_MYCHOICE" },
				{ "vkkey": "HBBTV_VK_CLOCK" },
				// { "vkkey" : "HBBTV_VK_SMARTTV" },
				//{ "vkkey" : "HBBTV_VK_CHANNELGRID" },
				{ "vkkey": "HBBTV_VK_ALARM" },
				{ "vkkey": "HBBTV_VK_SMARTINFO" },
				// { "vkkey" : "HBBTV_VK_SOURCE" },
				{ "vkkey": "HBBTV_VK_TV" },
				// { "vkkey" : "HBBTV_VK_FORMAT" },
				//{ "vkkey" : "HBBTV_VK_HOME" }, // not existing
				// { "vkkey" : "HBBTV_VK_PLAY_PAUSE" }, // previously was VK_OSRC
				{ "vkkey": "HBBTV_VK_GUIDE" },
				//{ "vkkey" : "HBBTV_VK_UP" }, // not existing
				// { "vkkey" : "HBBTV_VK_INFO" },
				{ "vkkey" : "HBBTV_VK_LEFT" }, // not existing
				// { "vkkey" : "HBBTV_VK_ACCEPT" }, // not existing
				{ "vkkey" : "HBBTV_VK_RIGHT" }, // not existing
				{ "vkkey": "HBBTV_VK_ADJUST" }, //SETTINGS BUTTON
				//{ "vkkey" : "HBBTV_VK_DOWN" }, // not existing
				{ "vkkey": "HBBTV_VK_MENU" }, // Home Button
				{ "vkkey": "HBBTV_VK_BACK" }, // not existing
				{ "vkkey": "HBBTV_VK_RED" },
				{ "vkkey": "HBBTV_VK_GREEN" },
				{ "vkkey": "HBBTV_VK_YOUTUBE" },
				{ "vkkey": "HBBTV_VK_WEATHER" },
				//{"vkkey": "	HBBTV_VK_SETTINGS"}, //doesn't affect settings button
				{ "vkkey": "HBBTV_VK_OPTIONS" },
				{ "vkkey": "HBBTV_VK_1" },
				{ "vkkey": "HBBTV_VK_2" },
				{ "vkkey": "HBBTV_VK_3" },
				{ "vkkey": "HBBTV_VK_4" }
			]
	}

	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}
// MAKING ALL BUTTONS EXCPET BACK & HOME TO VIRTUAL KEYS
function setBackHomeVirtual() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 6;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded":
			[
				{ "vkkey": "HBBTV_VK_MENU" }, // Home Button
				{ "vkkey": "HBBTV_VK_BACK" }, // not existing

			]
	}

	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}
// MAKING ACEPT VIRTUAL FOR VIDEO PAUSE PLAY
function setVideoKeys() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 6;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded":
			[
				{ "vkkey": "HBBTV_VK_CLOCK" },
				// { "vkkey" : "HBBTV_VK_SMARTTV" },
				//{ "vkkey" : "HBBTV_VK_CHANNELGRID" },
				{ "vkkey": "HBBTV_VK_ALARM" },
				{ "vkkey": "HBBTV_VK_SMARTINFO" },
				// { "vkkey" : "HBBTV_VK_SOURCE" },
				{ "vkkey": "HBBTV_VK_TV" },
				// { "vkkey" : "HBBTV_VK_FORMAT" },
				//{ "vkkey" : "HBBTV_VK_HOME" }, // not existing
				// { "vkkey" : "HBBTV_VK_PLAY_PAUSE" }, // previously was VK_OSRC
				{ "vkkey": "HBBTV_VK_GUIDE" },
				//{ "vkkey" : "HBBTV_VK_UP" }, // not existing
				// { "vkkey" : "HBBTV_VK_INFO" },
				{ "vkkey" : "HBBTV_VK_LEFT" }, // not existing
				{ "vkkey" : "HBBTV_VK_ACCEPT" }, // not existing
				{ "vkkey" : "HBBTV_VK_RIGHT" }, // not existing
				{ "vkkey": "HBBTV_VK_ADJUST" }, //SETTINGS BUTTON
				//{ "vkkey" : "HBBTV_VK_DOWN" }, // not existing
				{ "vkkey": "HBBTV_VK_MENU" }, // Home Button
				{ "vkkey": "HBBTV_VK_BACK" }, // not existing
				{ "vkkey": "HBBTV_VK_RED" },
				{ "vkkey": "HBBTV_VK_GREEN" },
				{ "vkkey": "HBBTV_VK_YOUTUBE" },
				{ "vkkey": "HBBTV_VK_WEATHER" },
				//{"vkkey": "	HBBTV_VK_SETTINGS"}, //doesn't affect settings button
				{ "vkkey": "HBBTV_VK_OPTIONS" },
				{ "vkkey": "HBBTV_VK_1" },
				{ "vkkey": "HBBTV_VK_2" },
				{ "vkkey": "HBBTV_VK_3" },
				{ "vkkey": "HBBTV_VK_4" }
			]
	}

	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}
// MAKING UP AND DOWN ARROW KEYS SCROLL
function setPDFViewKeys() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 6;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode": "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded":
			[
				{ "vkkey": "HBBTV_VK_CLOCK" },
				// { "vkkey" : "HBBTV_VK_SMARTTV" },
				//{ "vkkey" : "HBBTV_VK_CHANNELGRID" },
				{ "vkkey": "HBBTV_VK_ALARM" },
				{ "vkkey": "HBBTV_VK_SMARTINFO" },
				// { "vkkey" : "HBBTV_VK_SOURCE" },
				{ "vkkey": "HBBTV_VK_TV" },
				// { "vkkey" : "HBBTV_VK_FORMAT" },
				//{ "vkkey" : "HBBTV_VK_HOME" }, // not existing
				// { "vkkey" : "HBBTV_VK_PLAY_PAUSE" }, // previously was VK_OSRC
				{ "vkkey": "HBBTV_VK_GUIDE" },
				{ "vkkey" : "HBBTV_VK_UP" }, // not existing
				// { "vkkey" : "HBBTV_VK_INFO" },
				{ "vkkey" : "HBBTV_VK_LEFT" }, // not existing
				{ "vkkey" : "HBBTV_VK_ACCEPT" }, // not existing
				{ "vkkey" : "HBBTV_VK_RIGHT" }, // not existing
				{ "vkkey": "HBBTV_VK_ADJUST" }, //SETTINGS BUTTON
				{ "vkkey" : "HBBTV_VK_DOWN" }, // not existing
				{ "vkkey": "HBBTV_VK_MENU" }, // Home Button
				{ "vkkey": "HBBTV_VK_BACK" }, // not existing
				{ "vkkey": "HBBTV_VK_RED" },
				{ "vkkey": "HBBTV_VK_GREEN" },
				{ "vkkey": "HBBTV_VK_YOUTUBE" },
				{ "vkkey": "HBBTV_VK_WEATHER" },
				//{"vkkey": "	HBBTV_VK_SETTINGS"}, //doesn't affect settings button
				{ "vkkey": "HBBTV_VK_OPTIONS" },
				{ "vkkey": "HBBTV_VK_1" },
				{ "vkkey": "HBBTV_VK_2" },
				{ "vkkey": "HBBTV_VK_3" },
				{ "vkkey": "HBBTV_VK_4" }
			]
	}

	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function changeCDBstate(state) {
	//updating ui status
	if (state == 'Activate'){
		dashboard_on = true;
	}
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie = 1020;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails =
	{
		"ApplicationDetails":
			//{ "ApplicationName" : "SystemUI" },
			{ "ApplicationName": "CustomDashboard" },// from htvlib 0.72 onwards
		"ApplicationState": state
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

var keyPressTimer;
const LONG_PRESS_DELAY = 500; // Time in milliseconds to detect long press
function keyDownHandler(e) {
	keyHandler(e.keyCode);
	// document.getElementById("logmsgcallback").value += '\n' + 'Remote Key Press: '+e.keyCode + '\n';
	// document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
	if (current_page == 'video-frame'){
		if (keyPressTimer) return;
        keyPressTimer = setInterval(() => {
            console.log("Long press detected:");
            startSeeking();
        }, LONG_PRESS_DELAY);
	}
}

function startSeeking() {
	console.log("Seeking")
	document.getElementById("logmsgcallback").value += '\n' + 'Long Press deteched' + '\n';
	document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
}

function OnKeyReceivedHandler(event) {
	var eventDetail = event.detail; //It contains key code and window ID                       
	var eventval = eventDetail.split(',');
	var keyStatus = parseInt(eventval[1]);
	var keyCode = -1;

	if (keyStatus == 2) {
		keyCode = parseInt(eventval[0]);
		keyHandler(keyCode);
	}
}


function keyHandler(keyCode) {
	try {
		switch (keyCode) {
			case VK_MENU:
				//coming after clinical cast
				if (current_page == 'clinical_casting') {
					setRcControlSelective();
					current_page = "clinicalservices_menu";
					previous_page = "default_view";
					changeCDBstate('Activate');
					UtilityRefreshPage();
					break;
				} else if (current_page == 'tv_view') {
					current_page = "entertainment_menu";
					previous_page = "default_view";
					setRcControlSelective();
					//setRcControlNone();
					// switchToHDMI1();
					channelStopPlaying(current_tv_channel);
					// dashboard_on = true;
					changeCDBstate('Activate');
					UtilityRefreshPage();

					break;
				} else if (current_page == 'movies') {
					current_page = "entertainment_menu";
					previous_page = "default_view";
					openMovies('Deactivate');
					changeCDBstate('Activate');
					UtilityRefreshPage();
					break;
				} else if (current_page == 'radio_view') {
					channelStopPlaying(radio_channel_playing);
					document.querySelector('.sidebar').style.display = 'block';

					// ADJUSTING DISPLAY ELEMENTS
					const gif = document.querySelector("#gif");
					const rightColumn = document.getElementById("radio_title");
					const gifTitle = document.getElementById("gif-title");
					const rightColumnLogo = document.getElementById("radio-logo-right");
					rightColumn.innerText = 'Press Radio Channel to Play';
					gif.style.display = 'none';
					gifTitle.style.display = 'none';
					rightColumnLogo.style.display = 'none';

					UtilityRefreshPage();
				} else if (current_page == 'phillips_cast') {
					SelectCast('Deactivate');
					current_page = "entertainment_menu";
					previous_page = "default_view";
					UtilityRefreshPage();
					break;
				} else if (current_page == 'video-frame') {
					setRcControlSelective(); //setting virtual keys back to standard
					// const videoSrcFrame = document.getElementById('video-src-iframe');
					const videoElement = document.getElementById('video-frame');
					if (videoElement) {
						videoElement.src = '';  //d the welcome video and activated the dashbo
						videoElement.currentTime = 0;
						videoElement.pause();
						// videoElement.removeEventListener("ended", backTemp());
					}
					document.removeEventListener("keyup", handleKeyUp);
				} else if (current_page == 'visiting_hours') {
					current_page = "hospitalinfo_menu";
					previous_page = "default_view";
					openInternetWithPdf('Deactivate');
				} else if (current_page == 'pdf-viewers'){
					setRcControlSelective();
				}
				//activate the dashboard going back from where i am to dashboard
				document.getElementById(current_page).style.display = 'none';
				current_page = 'default_view';
				document.getElementById(current_page).style.display = 'flex';


				changeCDBstate('Activate');

				break;
			case VK_1: //Refreshes the dashboard
				UtilityRefreshPage();
				break;
			case VK_2: //Refreshes the dashboard
				reboot();
				break;
			case VK_3: //Refreshes the dashboard
				UtilityToggleLogsWindow();
				break;
			case VK_4:
				var element = document.getElementById("ipaddydiv");
				var currentDisplay = window.getComputedStyle(element).display;


				if (currentDisplay === 'none') {
					element.style.display = 'flex';  // Show the element
				} else {
					element.style.display = 'none';  // Hide the element
				}
				break;
			case VK_BACK: //BACK BUTTNO FUNCTIONALITIES //
				//coming after clinical cast
				if (current_page == 'clinical_casting') {
					setRcControlSelective();
					current_page = "clinicalservices_menu";
					previous_page = "default_view";
					changeCDBstate('Activate');
					break;
				} else if (current_page == 'tv_view') {
					if (channel_list_view_on == true){
						tvChannelsList('Deactivate');
						break;
					}
					current_page = "entertainment_menu";
					previous_page = "default_view";
					setRcControlSelective();
					//setRcControlNone();
					// switchToHDMI1();
					channelStopPlaying(current_tv_channel);
					// dashboard_on = true;
					changeCDBstate('Activate');
					break;
				} else if (current_page == 'movies') {
					current_page = "entertainment_menu";
					previous_page = "default_view";
					openMovies('Deactivate');
					changeCDBstate('Activate');
					break;
				} else if (current_page == 'radio_view') {
					channelStopPlaying(radio_channel_playing);
					document.querySelector('.sidebar').style.display = 'block';

					// ADJUSTING DISPLAY ELEMENTS
					const gif = document.querySelector("#gif");
					const rightColumn = document.getElementById("radio_title");
					const gifTitle = document.getElementById("gif-title");
					const rightColumnLogo = document.getElementById("radio-logo-right");
					rightColumn.innerText = 'Press Radio Channel to Play';
					gif.style.display = 'none';
					gifTitle.style.display = 'none';
					rightColumnLogo.style.display = 'none';

				} else if (current_page == 'phillips_cast') { 
					SelectCast('Deactivate');
					current_page = "entertainment_menu";
					previous_page = "default_view";
					break;
				} else if (current_page == 'video-frame') {
					setRcControlSelective(); //setting virtual keys back to standard
					// const videoSrcFrame = document.getElementById('video-src-iframe');
					const videoElement = document.getElementById('video-frame');
					if (videoElement) {
						videoElement.src = '';  //d the welcome video and activated the dashbo
						videoElement.currentTime = 0;
						videoElement.pause();
						// videoElement.removeEventListener("ended", backTemp());
					}
					document.removeEventListener("keyup", handleKeyUp);
				} else if (current_page == 'visiting_hours') {
					current_page = "hospitalinfo_menu";
					previous_page = "default_view";
					openInternetWithPdf('Deactivate');
					break;
				} else if (current_page == 'pdf-viewers'){
					setRcControlSelective();
				}
				document.getElementById(current_page).style.display = 'none';
				document.getElementById(previous_page).style.display = 'flex';
				current_page = previous_page;
				previous_page = "default_view";
				break;
			case VK_LEFT: 
				if (current_page == 'tv_view'){
					tvChannelsList('Activate');
				} else if (current_page == 'video-frame') {
					const videoElement = document.getElementById('video-frame');
					videoElement.currentTime = Math.max(videoElement.currentTime - 1, 0);
					break;
				} else if (current_page == 'pdf-viewers'){
        			document.getElementById("pdf-viewers").focus();
        			break; 
				}
			case VK_RIGHT:
				if (current_page == 'tv_view'){
					tvChannelsList('Activate');
				} else if (current_page == 'video-frame') {
					const videoElement = document.getElementById('video-frame');
					videoElement.currentTime = Math.min(videoElement.currentTime + 1, videoElement.duration);
					break;
				} else if (current_page == 'pdf-viewers'){
					document.getElementById("pdf-viewers").focus();
        			break; 
				}
				
				break;
			case VK_UP:
				if (current_page == 'pdf-viewers'){
					const pdfContainer = document.getElementById("pdf-viewers");
        			pdfContainer.scrollTop -= 50;
					
				}
			case VK_DOWN: 
				const pdfContainer = document.getElementById("pdf-viewers");
				pdfContainer.scrollTop += 50;
			case VK_RIGHT:
				if (current_page == 'tv_view'){
					tvChannelsList('Activate');
				} else if (current_page == 'video-frame') {
					const videoElement = document.getElementById('video-frame');
					videoElement.currentTime = Math.min(videoElement.currentTime + 1, videoElement.duration);
					break;
				}
				
				break;
			default:
				alert("Nothing to handle \n");
				break;
		}
	}
	catch (e) {
		//Keyhandler error
		document.getElementById("logmsgcallback").value += '\n' + "JAPITmode.js line 456" + e + '\n';
		document.getElementById("logmsgcallback").scrollTop = document.getElementById("logmsgcallback").scrollHeight;
	}

	//Exit Keyhandler
}



function handleExitButton() {
	// Implement exit logic here
}

