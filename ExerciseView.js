/* 
*
* This can be reused in as is or even modified freely.
*
*/

const ChannelNumber = "Channel Number: ";
const ChannelSelectionStatus = "Channel Selection Status: ";
const ChannelSelectionFailureReason = "Channel Selection Failure Reason: ";
const ChannelPlayingStatus = "Channel Playing Status: ";
const ChannelPlayingStatusErrorDetails = "Channel Playing Status Error Details : ";

var channelListAlreadyQueried = "false";

function Exercise01ViewInit()
{
	CreateHTMLElements();
	ShowDivIO("None");
}

function CreateHTMLElements()
{
	IdDiv01 = document.getElementById("DivIO1");
	IdDiv02 = document.getElementById("DivIO2");
	IdChannelNumber = document.getElementById("IdChannelNumber");
	IdChannelSelectionStatus = document.getElementById("IdChannelSelectionStatus");
	IdChannelSelectionFailureReason = document.getElementById("IdChannelSelectionFailureReason");
	IdChannelPlayingStatus = document.getElementById("IdChannelPlayingStatus");
	IdChannelPlayingStatusErrorDetails = document.getElementById("IdChannelPlayingStatusErrorDetails");
	
	/*
	IdTimeInputText = document.getElementById("IdTimeInputText");
	
	IdMainFirmwareVersion = document.getElementById("IdMainFirmwareVersion");
	IdTVSettingsVersion = document.getElementById("IdTVSettingsVersion");
	IdTVChannelListVersion = document.getElementById("IdTVChannelListVersion");
	*/
}

function ChangeChannel() 
{
	var channelNum = document.getElementById("chNum").value;
	SelectChannelByNumber(parseInt(channelNum));
}

function HandleChannelSelectionResponse(WIXPJsonResponse)
{
	ShowDivIO("DivIO1");
	IdChannelNumber.innerHTML = ChannelNumber + WIXPJsonResponse.CommandDetails.ChannelTuningDetails.ChannelNumber;
	IdChannelSelectionStatus.innerHTML = ChannelSelectionStatus + WIXPJsonResponse.CommandDetails.ChannelSelectionStatus;
	if(WIXPJsonResponse.CommandDetails.ChannelSelectionStatus == "Failure")
	{
		IdChannelSelectionFailureReason.innerHTML = ChannelSelectionFailureReason + WIXPJsonResponse.CommandDetails.ChannelSelectionStatusErrorDetails;
	}
	else
	{
		IdChannelPlayingStatus.innerHTML = ChannelPlayingStatus + WIXPJsonResponse.CommandDetails.ChannelPlayingStatus;
		if(WIXPJsonResponse.CommandDetails.ChannelPlayingStatus == "Error")
		{
			IdChannelPlayingStatusErrorDetails.innerHTML = ChannelPlayingStatusErrorDetails + WIXPJsonResponse.CommandDetails.ChannelPlayingStatusErrorDetails;
		}
		else
		{
			IdChannelPlayingStatusErrorDetails.innerHTML = ChannelPlayingStatusErrorDetails + "None";
		}
		IdChannelSelectionFailureReason.innerHTML = ChannelSelectionFailureReason + "None";
	}
}

function HandleAudioLanguageResponse(WIXPJsonResponse)
{
	var c = 0;
	var i = 0;
	var loop = 1;

	var table = document.getElementById("IDAudioLanguageList");
	
	do
	{
		if(WIXPJsonResponse.CommandDetails.AudioLanguageList[i] === 'undefined')
		{
			loop = 0;
			break;
		}
		else
		{
			var row = table.insertRow(i+1);
			var cell0 = row.insertCell(c);
			var cell1 = row.insertCell(c+1);
			i++;
		}
	}while(loop == 1)
}

function GetChannelList()
{
	if(channelListAlreadyQueried == "false")
	{
		GetNumberOfChannelsInTV();
		channelListAlreadyQueried = "true";
	}
	else
	{
		//Dont do anything
	}
	ShowDivIO("DivIO2");
}

/* a function to process the TV response; either to get or display the channels */
function HandleChannelListResponse(WIXPJsonResponse) {
	
	var ChList = WIXPJsonResponse.CommandDetails.ChannelList;
	var i = 0;
	channelsReceived += ChList.length;

	if (totalNumOfChannels == 0) {
		totalNumOfChannels = WIXPJsonResponse.CommandDetails.NumberOfChannels;
		document.getElementById("demo").innerHTML = "Number of channels: " + totalNumOfChannels;
		requestChannelsFromTV(start);
	}
	
	start += 40;

	for(i; i < ChList.length; i++) {
		chanNumArray[j] = WIXPJsonResponse.CommandDetails.ChannelList[i].ChannelNo;
		chanNameArray[j] = WIXPJsonResponse.CommandDetails.ChannelList[i].ChannelName;
		chanTypeArray[j] = WIXPJsonResponse.CommandDetails.ChannelList[i].ChannelType;
		j++;
	}

	if ((channelsReceived < totalNumOfChannels) && (start <= totalNumOfChannels)){
		requestChannelsFromTV(start);

	}  else if ((channelsReceived >= totalNumOfChannels) && (start > totalNumOfChannels)){
		DisplayChannelList(chanNumArray,chanNameArray,chanTypeArray);
	}
	else
	{
	
	}
}


/* a function to dispaly the channels list */
function DisplayChannelList(chanNumArray,chanNameArray,chanTypeArray){

	var c = 0;
	var i = 0;

	var table = document.getElementById("chTable");
	
	for (i; i < 5; i++) {

		var row = table.insertRow(i+1);
		var cell0 = row.insertCell(c);
    	var cell1 = row.insertCell(c+1);
    	var cell2 = row.insertCell(c+2);

		cell0.appendChild(document.createTextNode(chanNumArray[i]));
		cell1.appendChild(document.createTextNode(chanNameArray[i]));
		cell2.appendChild(document.createTextNode(chanTypeArray[i]));
	}
}

function DisplayUpgradeControl(WIXPJsonResponse)
{
	IdMainFirmwareVersion.innerHTML = FWVesrion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[0]["CloneItemVersionNo"];
	IdTVSettingsVersion.innerHTML = TVSettingsVersion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[1]["CloneItemVersionNo"];
	IdTVChannelListVersion.innerHTML = TVChannelListVersion + WIXPJsonResponse.CommandDetails.UpgradeControlParameters[2]["CloneItemVersionNo"];	
}

function DisplayCurrentDateAndTime(WIXPJsonResponse)
{
	var currentdate = new Date(); 
	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
				
	if(WIXPJsonResponse)
	{
		var clockTime = WIXPJsonResponse.CommandDetails.ClockTime;
		var currentDate = WIXPJsonResponse.CommandDetails.CurrentDate;
	}
	else
	{
		var clockTime = "Unkown";
		var currentDate = "Unkown";
	}

	IdDateText.innerHTML = SysDate + currentDate;
	IdTimeText.innerHTML = SysTime + clockTime;
	IdLinuxDateTime.innerHTML = LinuxDateTime + datetime;
}

function ChangeNewSystemDateAndTime()
{
	
}

// detach

/* a function to showLogs the page */
function ShowDivIO(DivIOTobeShown)
{
	// Get all elements, checking if they exist first
	const elements = {
		demo: document.getElementById("demo"),
		demo2: document.getElementById("demo2"),
		chTable: document.getElementById("chTable"),
		divIO1: document.getElementById("DivIO1"),
		divIO2: document.getElementById("DivIO2"),
		channelNumber: document.getElementById("IdChannelNumber"),
		channelSelectionStatus: document.getElementById("IdChannelSelectionStatus"),
		channelSelectionFailureReason: document.getElementById("IdChannelSelectionFailureReason"),
		channelPlayingStatus: document.getElementById("IdChannelPlayingStatus"),
		audioLanguageList: document.getElementById("IDAudioLanguageList")
	};

	// Helper function to safely set visibility
	const setVisibility = (element, visible) => {
		if (element && element.style) {
			element.style.visibility = visible ? "visible" : "hidden";
		}
	};

	if (DivIOTobeShown == "DivIO1") {
		// Hide DivIO2 elements
		setVisibility(elements.demo, false);
		setVisibility(elements.demo2, false);
		setVisibility(elements.chTable, false);
		setVisibility(elements.divIO2, false);
		
		// Show DivIO1 elements
		setVisibility(elements.divIO1, true);
		setVisibility(elements.channelNumber, true);
		setVisibility(elements.channelSelectionStatus, true);
		setVisibility(elements.channelSelectionFailureReason, true);
		setVisibility(elements.channelPlayingStatus, true);
		setVisibility(elements.audioLanguageList, true);
	}
	else if (DivIOTobeShown == "DivIO2") {
		// Hide DivIO1 elements
		setVisibility(elements.channelNumber, false);
		setVisibility(elements.channelSelectionStatus, false);
		setVisibility(elements.channelSelectionFailureReason, false);
		setVisibility(elements.channelPlayingStatus, false);
		setVisibility(elements.audioLanguageList, false);
		setVisibility(elements.divIO1, false);
		
		// Show DivIO2 elements
		setVisibility(elements.divIO2, true);
		setVisibility(elements.demo, true);
		setVisibility(elements.demo2, true);
		setVisibility(elements.chTable, true);
	}
	else {
		// Hide all elements
		Object.values(elements).forEach(element => setVisibility(element, false));
	}
}