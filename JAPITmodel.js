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

		// CHANNELS RESPONSE
		if (parsedWIXPJSON.Fun == "ChannelSelection"){ //When TV responds with an error
			if (tv_channel_on == 1 && dashboard_on) {
				
				if (parsedWIXPJSON.CommandDetails.ChannelTuningDetails.ChannelNumber){
					if (parsedWIXPJSON.CommandDetails.ChannelSelectionStatus == 'Failure'){
						setTimeout(loadChannel, 1000);
						//document.getElementById("loadingGif").style.display = 'block';
						//channelSelection(default_chan_no);
					} else if (parsedWIXPJSON.CommandDetails.ChannelSelectionStatus == 'Started'){
						//document.getElementById("loadingGif").style.display = 'none';
						document.getElementById("loadingGif").style.display = 'none';
						tvChannelsList('Activate');
					}	
				}
			
			} else if (tv_channel_on == 1) {
				current_tv_channel = parsedWIXPJSON.CommandDetails.ChannelTuningDetails.ChannelNumber;
				document.getElementById("logmsgcallback").value += '\n' + 'Updated TV Channel to ' + current_tv_channel  + '\n';
				document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
			}
			
		} 
	} catch (e) {
		//Error - can print to logs view
		document.getElementById("logmsgcallback").value += '\n' + e + '\n';
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
	document.getElementById("loadingGif").style.display = 'flex';
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

function changeCDBstate(state) {
	//updating ui status
	if (state == 'Activate'){
		homepage_on = true;
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

function keyDownHandler(e) {
	keyHandler(e.keyCode);
	// document.getElementById("logmsgcallback").value += '\n' + 'Remote Key Press: '+e.keyCode + '\n';
	// document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
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
					break;
				} else if (current_page == 'tv_view') {
					current_page = "entertainment_menu";
					previous_page = "default_view";
					switchToHDMI1();
					changeCDBstate('Activate');

					break;
				} else if (current_page == 'radio_view') {
					channelStopPlaying(radio_channel_playing);
					document.querySelector('.sidebar').style.display = 'block';
				} else if (current_page == 'video-frame') {
					const videoSrcFrame = document.getElementById('video-src-iframe');
					const videoElement = document.getElementById('video-frame');
					if (videoSrcFrame) {
						videoSrcFrame.src = '';  //d the welcome video and activated the dashbo
						videoElement.currentTime = 0;
						videoElement.pause();
						// videoElement.removeEventListener("ended", backTemp());
					}
				} else if (current_page == 'visiting_hours') {
					current_page = "hospitalinfo_menu";
					previous_page = "default_view";
					openInternetWithPdf('Deactivate');
				}
				//activate the dashboard going back from where i am to dashboard
				document.getElementById(current_page).style.display = 'none';
				current_page = 'default_view';
				document.getElementById(current_page).style.display = 'block';


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
			case VK_BACK:
				//coming after clinical cast
				if (current_page == 'clinical_casting') {
					setRcControlSelective();
					current_page = "clinicalservices_menu";
					previous_page = "default_view";
					changeCDBstate('Activate');
					break;
				} else if (current_page == 'tv_view') {
					current_page = "entertainment_menu";
					previous_page = "default_view";
					switchToHDMI1();
					changeCDBstate('Activate');
					break;
				} else if (current_page == 'radio_view') {
					channelStopPlaying(radio_channel_playing);
					document.querySelector('.sidebar').style.display = 'block';
				} else if (current_page == 'video-frame') {
					const videoSrcFrame = document.getElementById('video-src-iframe');
					const videoElement = document.getElementById('video-frame');
					if (videoSrcFrame) {
						videoSrcFrame.src = '';  //d the welcome video and activated the dashbo
						videoElement.currentTime = 0;
						videoElement.pause();
						// videoElement.removeEventListener("ended", backTemp());
					}
				} else if (current_page == 'visiting_hours') {
					current_page = "hospitalinfo_menu";
					previous_page = "default_view";
					openInternetWithPdf('Deactivate');
					break;
				}
				document.getElementById(current_page).style.display = 'none';
				document.getElementById(previous_page).style.display = 'block';
				current_page = previous_page;
				previous_page = "default_view";
				break;
			default:
				alert("Nothing to handle \n");
				break;
		}
	}

	catch (e) {
		//Keyhandler error
	}

	//Exit Keyhandler
}



function handleExitButton() {
	// Implement exit logic here
}

