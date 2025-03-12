/* 
*
* This File contains all those related to Controlling TV via JAPIT WIXP .
* This can be reused in as is or even modified freely.
*
*/
/* global variables */

var radio_channel_on = 0;
var current_page = "default_view";
var previous_page = "";

function Exercise01ModelInit() {
	setRcControlSelective();
	RegisterCallbacks();
}

/* assigning the callback function from the TV to another function*/
function RegisterCallbacks(){
	JAPITWIXPPlugin.WebIXPOnReceive = WIXPResponseHandler;
}

/* this function will call the required function depending on the response received from the TV */
function WIXPResponseHandler(WIXPResponseJSON){
	try {
		parsedWIXPJSON = JSON.parse(WIXPResponseJSON);
		PrintLogsWIXPFromTV(parsedWIXPJSON);
		
		if (parsedWIXPJSON.Fun == "ProfessionalSettingsControl") {
		
		} else if (parsedWIXPJSON.Fun == "ChannelList") {
			channelListResponseFromTV(parsedWIXPJSON);
		}
	} catch(e) {
		//Error - can print to logs view
		document.getElementById("logmsgcallback").value += '\n' + e + '\n';
		document.getElementById("logmsgcallback").scrollTop=document.getElementById("logmsgcallback").scrollHeight;
		errorCount++;
		//This is turn the tv screen off and reset the errorCount. Mainly to over the Googlecast error.
		if (errorCount > 10){
			errorCount = 0;
			//powerState('Standby');
		}
		return e;
	}
}

/* function to send commands to TV */
function sendWIxPCommand(command){
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
function CreateJAPITObjectForWIXPSvc(){
	this.Svc    = "WIXP";
	this.SvcVer = "4.0";
	this.Cookie = 222;
}

function switchToMainTuner(){
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();

	JAPITObjForWIXPSvc.Cookie = 1055;
	JAPITObjForWIXPSvc.CmdType = "Change";
	JAPITObjForWIXPSvc.Fun = "Source";
	JAPITObjForWIXPSvc.CommandDetails = {
		"TuneToSource": "MainTuner"
	};

	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function switchToHDMI1(){  //clinical services to HDMI STR
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

function activateTeletext(){

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1021;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		"ApplicationDetails" :
		{ "ApplicationName" : "Teletext" ,
			"ApplicationAttributes" : 
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
	JAPITObjForWIXPSvc.Cookie         = 1022;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		"ApplicationDetails" :
		{ "ApplicationName" : "Teletext" ,
		},
		"ApplicationState": "Deactivate"
	};
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function setRcControlAll(){
	
	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1011;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode"   : "AllVirtualKeyForward"
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

function setRcControlExTxt() {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1013;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode"   : "ForwardAllExceptVirtualKeysRequiredForTeletext"
	}
	sendWIxPCommand(JAPITObjForWIXPSvc);
}

// Setting virtual keys
function setRcControlSelective(){

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 6;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "UserInputControl";
	JAPITObjForWIXPSvc.CommandDetails = {
		"VirtualKeyForwardMode" : "SelectiveVirtualKeyForward",
		"VirtualKeyToBeForwarded" :
			[
			// { "vkkey" : "HBBTV_VK_POWER" }, // not existing 
			// { "vkkey" : "HBBTV_VK_MYCHOICE" },
			{ "vkkey" : "HBBTV_VK_CLOCK" },
			// { "vkkey" : "HBBTV_VK_SMARTTV" },
			//{ "vkkey" : "HBBTV_VK_CHANNELGRID" },
			{ "vkkey" : "HBBTV_VK_ALARM" },
			{ "vkkey" : "HBBTV_VK_SMARTINFO" },
			// { "vkkey" : "HBBTV_VK_SOURCE" },
			{ "vkkey" : "HBBTV_VK_TV" },
			// { "vkkey" : "HBBTV_VK_FORMAT" },
			//{ "vkkey" : "HBBTV_VK_HOME" }, // not existing
			// { "vkkey" : "HBBTV_VK_PLAY_PAUSE" }, // previously was VK_OSRC
			{ "vkkey" : "HBBTV_VK_GUIDE" },
			// { "vkkey" : "HBBTV_VK_UP" }, // not existing
			// { "vkkey" : "HBBTV_VK_INFO" },
			//{ "vkkey" : "HBBTV_VK_LEFT" }, // not existing
			// { "vkkey" : "HBBTV_VK_ACCEPT" }, // not existing
			// { "vkkey" : "HBBTV_VK_RIGHT" }, // not existing
			{ "vkkey" : "HBBTV_VK_ADJUST" }, //SETTINGS BUTTON
			// { "vkkey" : "HBBTV_VK_DOWN" }, // not existing
			{ "vkkey" : "HBBTV_VK_MENU" }, // Home Button
			{ "vkkey" : "HBBTV_VK_BACK" }, // not existing
			{ "vkkey" : "HBBTV_VK_RED" },
			{ "vkkey" : "HBBTV_VK_GREEN" },
			{"vkkey": "HBBTV_VK_YOUTUBE"},
			{"vkkey": "HBBTV_VK_WEATHER"},
			//{"vkkey": "	HBBTV_VK_SETTINGS"}, //doesn't affect settings button
			{"vkkey": "HBBTV_VK_OPTIONS"},
			{"vkkey": "HBBTV_VK_1"},
			{"vkkey": "HBBTV_VK_2"},
			{"vkkey": "HBBTV_VK_3"},
			{"vkkey": "HBBTV_VK_4"}
		]
	}

	sendWIxPCommand(JAPITObjForWIXPSvc);
	delete JAPITObjForWIXPSvc;
}

function changeCDBstate(state) {

	var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
	JAPITObjForWIXPSvc.Cookie         = 1020;
	JAPITObjForWIXPSvc.CmdType        = "Change";
	JAPITObjForWIXPSvc.Fun            = "ApplicationControl";
	JAPITObjForWIXPSvc.CommandDetails = 
	{
		"ApplicationDetails" :
		//{ "ApplicationName" : "SystemUI" },
		{ "ApplicationName" : "CustomDashboard" },// from htvlib 0.72 onwards
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

	if(keyStatus == 2){
		keyCode = parseInt(eventval[0]);
		keyHandler(keyCode);
	}
}


function keyHandler(keyCode)
 {
	try {
		switch (keyCode) { 
			case VK_MENU:
				channelStopPlaying(radio_channel_playing);
				
				 //activate the dashboard going back from where i am to dashboard
				document.getElementById(current_page).style.display = 'none';
				current_page = 'default_view';
				document.getElementById(current_page).style.display = 'flex';

				changeCDBstate('Activate');

				const videoSrcFrame = document.getElementById('video-src-iframe');
		
				if (videoSrcFrame) {
					videoSrcFrame.src = '';  //d the welcome video and activated the dashbo
					// ard
				}
				
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




// function handleEntertainmentKeys(keyCode) {
// 	if (document.querySelector('.entertainment-view').style.display === 'block') {
// 		var JAPITObjForWIXPSvc = new CreateJAPITObjectForWIXPSvc();
// 		JAPITObjForWIXPSvc.Cookie = 1030;
// 		JAPITObjForWIXPSvc.CmdType = "Change";
// 		JAPITObjForWIXPSvc.Fun = "UserInputControl";
		
// 		switch(keyCode) {
// 			case 37: // Left
// 				JAPITObjForWIXPSvc.CommandDetails = {
// 					"VirtualKeyDetails": {
// 						"VirtualKey": "HBBTV_VK_LEFT"
// 					}
// 				};
// 				handleLeftButton();
// 				break;
				
// 			case 39: // Right
// 				JAPITObjForWIXPSvc.CommandDetails = {
// 					"VirtualKeyDetails": {
// 						"VirtualKey": "HBBTV_VK_RIGHT"
// 					}
// 				};
// 				handleRightButton();
// 				break;
				
// 			case 38: // Up
// 				JAPITObjForWIXPSvc.CommandDetails = {
// 					"VirtualKeyDetails": {
// 						"VirtualKey": "HBBTV_VK_UP"
// 					}
// 				};
// 				handleUpButton();
// 				break;
				
// 			case 40: // Down
// 				JAPITObjForWIXPSvc.CommandDetails = {
// 					"VirtualKeyDetails": {
// 						"VirtualKey": "HBBTV_VK_DOWN"
// 					}
// 				};
// 				handleDownButton();
// 				break;
// 		}
		
// 		sendWIxPCommand(JAPITObjForWIXPSvc);
// 		delete JAPITObjForWIXPSvc;
// 		return 0;
// 	}
// 	return 1;
// 	}
// }

// 


function handleExitButton() {
	// Implement exit logic here
}

